import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'
//initializing a navbar arrow function
const Navbar = () => {
  const navigate = useNavigate();
  //This delete function is used to delete all the data in the database
  function Delete(){
    //deleting all the data from database by using deletebook endpoint that was created in the backend
    fetch("http://localhost:3001/deletebook",{
      method:"DELETE"
    }).then((res)=>res.json())
    .then((data)=>{
      //if the datas is deleted successfully it will show an alert message
       if(data.status==="Success"){
          window.location.reload();
          alert("All the books have been Deleted successfully")
       }
    })
    .catch((e)=>console.log(e))
  }
  return (
    <>
    <div id='navbar-container'>
     <button onClick={()=>{navigate("/addbook")}}>Addbook</button>
     <button onClick={Delete}>Delete All</button>

    </div>
    </>
  )
}

export default Navbar