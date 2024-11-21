//Imports
import Notes from './models/Notes.js';
import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
var app = express();


//MiddleWares
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Variables Assignment
const PORT = process.env.PORT || 7000; 

// Routes
app.get('/', function (req, res) {
  res.send({ message: 'Hello sarthak' });
});

app.get('/Notes', async(req,res)=>{
    try {
        const notes = await Notes.find({}).sort({$natural:-1});
        return res.status(200).json({notes})
    } catch (error) {
        console.log(error);
        return res.status(400).json({error : error.message})
    }
})

app.post('/', async (req,res)=>{
    try {
        console.log(req.body);
        const {title,content,date} = req.body;
        const newNote = await Notes.create({
            title,
            content,
            date
        })
        return res.status(200).json({message: "Note Created",Notes: newNote})
    } catch (error) {
        console.log(error);
        return res.status(400).json({error : error.message})
    }
})

app.delete('/Notes/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const deleteNote = await Notes.findByIdAndDelete(id);
        if(!deleteNote){
            return res.status(404).json({message: "Note Not Found"});
        }
        return res.status(200).json({message: "Note Has Been Deleted Successfully"});
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
})


const ConnectToDb = ()=>{
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGODBURL).then(console.log("Connecte to Db")).catch( (error)=>{
        console.log(error);
    })
}


const serverStarted = async ()=> {
    try {
        ConnectToDb();
        app.listen(process.env.PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

serverStarted();
