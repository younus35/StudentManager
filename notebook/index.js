function handleFormSubmit(event){
    event.preventDefault();
    const name = event.target.title.value;
    const address= event.target.description.value;
    const obj ={
        usertitle:name,
        useraddress:address
    };
    axios.post("https://crudcrud.com/api/c80e603631da4a95896606404a8a638b/NoteDetails",obj)
      .then((res) =>{
        //console.log(res)
        axios.get("https://crudcrud.com/api/c80e603631da4a95896606404a8a638b/NoteDetails")
        .then((res) =>{
        countTotal(res.data.length);})
         showNewUserOnScreen(res.data);
        
      })
      .catch((err) =>{
          console.log(err);
          document.body.innerHTML = document.body.innerHTML + "<h4> Something Went Wrong</h4>"
          //using above line the html will be replaced with the above line
      });
}
window.addEventListener("DOMContentLoaded", ()=>{
    axios.get("https://crudcrud.com/api/c80e603631da4a95896606404a8a638b/NoteDetails")
      .then((res) =>{
          //console.log(res.data)
          countTotal(res.data.length);
          for(var i=0; i<res.data.length;i++){
            showNewUserOnScreen(res.data[i]);
          }
      })
      .catch((err) =>{
        console.log(err);
      });
      
})
function countTotal(count){
          const number = document.getElementById('count');
          number.innerHTML =  `<h3 style="text-align: center;" id="count">total notes:${count}</h3>`
}
function showNewUserOnScreen(user){
    document.getElementById('title').value='';
    document.getElementById('description').value='';
    
    const parentNode = document.getElementById('list-of-users');
    const childNode = `<li id="li"> ${user.usertitle} - ${user.useraddress} 
                       <button onclick=deleteUser('${user._id}')>Delete</button>
                       <button onclick=editUser('${user.usertitle}','${user.useraddress}','${user._id}')>Edit</button>
                       </li>`
    parentNode.innerHTML = parentNode.innerHTML + childNode;
    countList()
}
function deleteUser(userId){
      axios.delete(`https://crudcrud.com/api/c80e603631da4a95896606404a8a638b/NoteDetails/${userId}`)
        .then((res) =>{
            axios.get("https://crudcrud.com/api/c80e603631da4a95896606404a8a638b/NoteDetails")
            .then((res) =>{
            countTotal(res.data.length);})
              removeUserFromScreen();
        })
        .catch((err) =>{
             console.log(err)
        })
}
function editUser(usertitle,useraddress,userId){
    document.getElementById('title').value=usertitle;
    document.getElementById('description').value=useraddress;
    
    deleteUser(userId);
}
function removeUserFromScreen(){
    const parentNode = document.getElementById('list-of-users');
    const childNodeDelete = document.getElementById("li");
    if(childNodeDelete){
        parentNode.removeChild(childNodeDelete);
    }
    countList()
}
function countList(){
    const count1 = document.getElementById("count1")
    const numOfLis = document.querySelectorAll("li").length;
    count1.innerHTML = `<h3 style="text-align: center;" id="count">showing:${numOfLis}</h3>`
}

