//This imports the mongoose library which is used for interacting with the MongoDB database
const mongoose = require("mongoose");
//This imports the express library
const express = require("express");
const app = express();
//This imports the zors library which allows us to handle cross-origin Resource Sharing
const cors = require("cors")
//This sets the value of the port variable to 3001
const port = 3001;
//importing book model from "./model/book"
const Book = require("./model/book");
//This is the mongodb atlas connection that we have to connect with database
const connectionUrl = `mongodb+srv://Navaraj:gilAo24Sz2L3GG9T@cluster0.dwlicok.mongodb.net/mernpractice?retryWrites=true&w=majority`
app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', true);
// if the connection is successful it will output mongo connected otherwise shows an error
mongoose.connect(connectionUrl).then(()=>console.log("mongo connected")).catch((e)=>{console.log(e)})



//Posting a book

//This sets up a POST route for the endpoint "/postbook". It accepts an async function as the route handler, which means it can use the `await` keyword.
app.post("/postbook",async(req,res)=>{
//This logs the content of the request body to the console. The request body contains the data sent by the client when making a POST request.
    console.log(req.body)
    //This line uses the `Book` model (presumably defined earlier in the code) to create a new book document in the database. The data for the book is obtained from `req.body`, which should contain the book details sent by the client.

    try{
        let book= await Book.create(req.body);
        res.json({
            statusCode:200,
            status:"Success",
            book
        })
        }
        //If the book creation is successful, this sends a JSON response with a status code of 200 and a success message. It also includes the created `book` document in the response.
    catch(e){
        res.json({
            statusCode:500,
            message:e.message
        })
    }
    //If an error occurs during the book creation process (e.g., validation error or database error), this catches the error and sends a JSON response with a status code of 500 and the error message.


    
})

//Getting all books

//This sets up a Get route for the endpoint "/getbook". It accepts an async function as the route handler, which means it can use the `await` keyword
app.get("/getbook",async(req,res)=>{
    //This line uses the `Book` model (presumably defined earlier in the code)to get the details from   the database. The data for the book is obtained from `req.body`, which should contain the book details sent by the client.
    try{
     let books = await Book.find();
     console.log(books)
     res.json({
        statusCode:200,
        status:"Success",
        books
     })
     // if the book details get successful it will show status code of 200 and status success
    }
    catch(e){
        res.json({
            statusCode:500,
            message:e.message
        })
    }
    // if there is an error in getting details of the book it will show status code 500 and an error message
})

//deleting all Books

//This sets up a Delete route for the endpoint "/deletebook".
app.delete("/deletebook",async(req,res)=>{
    //the deleteMany() is used to delete all the book from the database
    try{
     await Book.deleteMany()
     // if the delete status is success it will show status code of 200 and status is success
     res.json({
        statusCode:200,
        status:"Success"
    })
    }
    // if there is an error it will show status code of 500 and error message
    catch(e){
        res.json({
            statusCode:500,
            message:e.message
        })
    }
})

//deleting a particular book

//This sets up a Delete route for the endpoint "/deletebook" for a particular id.
app.delete("/deletebook/:id",async(req,res)=>{
    //the deleteOne() is used to delete only data from the database by using id
    try{
        let books=await Book.deleteOne({_id:req.params.id})
        // if the book is deleted successfully it will show status code of 200 and status is success
        res.json({
            statusCode:200,
            status:"Success",
            books
         })
        }
        // if there is an error it will show status code 500 and an error message
        catch(e){
            res.json({
                statusCode:500,
                message:e.message
            })
    
    }
    
})
app.listen(port,()=>{console.log(`server is up at port ${3001}`)})