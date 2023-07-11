import React, { useEffect, useState } from 'react'
import "./Homepage.css";
import Navbar from '../Navbar/Navbar';

const Homepage = () => {
  //The component defines its own state using the useState hook. The books state is initialized as an empty array and will be updated with the fetched book data
  const [books,setbooks] = useState([]);
  //fetching the data from the backend using getbook endpoint and show the data in the homepage in a form of a card
  useEffect(()=>{
       fetch("http://localhost:3001/getbook")
       .then((res)=>res.json())
       .then((data)=>{
        setbooks(data.books)
      })
       .catch((e)=>console.log(e))
  },[])
  //This DeleteBook  function is used to delete a particular data from the database
  function DeleteBook(book){
    //fetching the data from the backend and deleting a particular data using an id
    fetch(`http://localhost:3001/deletebook/${book._id}`,{
      method:"Delete"
    })
    .then((res)=>res.json())
    .then((data)=>{
//if the status is success it will filter the particular id data and deletes that one
      if(data.status==="Success"){
let newbook = books.filter((newbooks)=>{
              return newbooks._id!==book._id
          })
          setbooks(newbook)
        }
      
    })
    .catch((e)=>console.log(e));

  }
  return (
    <>
    <Navbar/>
    <div id='card-container'>
      {
        // mapping the data in a form of a card
        books.map((book,index)=>{
            return (
              <div id='card' key={index} >
                <div className='box'>
                <img src="https://media.istockphoto.com/id/1367848168/photo/old-victorian-book-cover-in-gold-and-black-leather-the-chefs-doeuvre-dart-of-the-paris.jpg?b=1&s=170667a&w=0&k=20&c=005af1VhQ2QnTGDox1FAD0taK_qlaL_uAxbadGw_to0=" alt="book"  />
                <h1>{book.Name}</h1><hr/>
                <p>{book.Author}</p><hr/>
                <button onClick={()=>{DeleteBook(book)}}> Delete</button>

                </div>
                  </div>
            )
        })
      }
    </div>
    </>
  )
}

export default Homepage;