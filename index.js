function handleFormSubmit(event){
    event.preventDefault();
    const name = event.target.uname.value;
    const mobile = event.target.phno.value;
    const address= event.target.uaddress.value;
    const obj ={
        username:name,
        usermobile:mobile,
        useraddress:address
    };
    axios.post("https://crudcrud.com/api/500af84fab9441f1b471b20d23387b78/StudentDetails",obj)
      .then((res) =>{
        //console.log(res)
        axios.get("https://crudcrud.com/api/500af84fab9441f1b471b20d23387b78/StudentDetails")
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
    axios.get("https://crudcrud.com/api/500af84fab9441f1b471b20d23387b78/StudentDetails")
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
          number.innerHTML =  `<h3 style="text-align: center;" id="count">Total Students:${count}</h3>`
}
function showNewUserOnScreen(user){
    document.getElementById('uname').value='';
    document.getElementById('phno').value='';
    document.getElementById('uaddress').value='';
    
    const parentNode = document.getElementById('list-of-users');
    const childNode = `<li id=${user._id}> ${user.username} - ${user.usermobile} - ${user.useraddress} 
                       <button onclick=deleteUser('${user._id}')>Delete</button>
                       <button onclick=editUser('${user.username}','${user.usermobile}','${user.useraddress}','${user._id}')>Edit</button>
                       </li>`
    parentNode.innerHTML = parentNode.innerHTML + childNode;
}
function deleteUser(userId){
      axios.delete(`https://crudcrud.com/api/500af84fab9441f1b471b20d23387b78/StudentDetails/${userId}`)
        .then((res) =>{
            axios.get("https://crudcrud.com/api/500af84fab9441f1b471b20d23387b78/StudentDetails")
            .then((res) =>{
            countTotal(res.data.length);})
              removeUserFromScreen(userId);
        })
        .catch((err) =>{
             console.log(err)
        })
}
function editUser(userName,userMobile,userAddress,userId){
    document.getElementById('uname').value=userName;
    document.getElementById('phno').value=userMobile;
    document.getElementById('uaddress').value=userAddress;
    
    deleteUser(userId);
}
function removeUserFromScreen(userId){
    const parentNode = document.getElementById('list-of-users');
    const childNodeDelete = document.getElementById(userId);
    if(childNodeDelete){
        parentNode.removeChild(childNodeDelete);
    }
}
