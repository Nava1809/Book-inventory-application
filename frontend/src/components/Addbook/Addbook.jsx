import React, { useState } from 'react'
import './Addbook.css'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
const Addbook = () => {
    //The initial state is set to empty when user inputs a Name it will be updated by set state function
    const [Name,setName]=useState("");
    //The initial state is set to empty when user inputs a Author it will be updated by set state function

    const [Author,setAuthor]=useState("");
      const navigate = useNavigate();

    function Postbook(){
        //if the name is empty or Author is empty it will give a alert message
      if(Name===""||Author==="" ){
        alert("please fill the Name and Author")
      }
      else{
        //this line of code helps in posting the user data in database
        fetch("http://localhost:3001/postbook",{
            method:"POST",
            body:JSON.stringify({
                Name:Name,
                Author:Author,
                


            }),
            //The headers is set to application/json and encoding is set to UTF-8
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        }).then((res)=>res.json())
        .then((data)=>{
            //if the status is success it will redirect to homepage you will see the data is mapped in homepage
            if(data.status==="Success"){
                navigate("/");
            }
        })
        .catch((e)=>{console.log(e)})
      }
    }
    return (
        <>
            <Navbar />
            
            <div id='addbook-container'>
                <div>
                    <h2>Name</h2>
                    <input placeholder='Title' onChange={(e)=>{setName(e.target.value)}}></input>
                </div>
                <div id='Author-div'>
                    <h2>Author</h2>
                    <input placeholder="Author"  onChange={(e)=>{setAuthor(e.target.value)}}></input>
                </div>
                


                <div id='btn'>
                <button onClick={Postbook}>Post</button>
                </div>
            </div>
        </>
    )
}

export default Addbook