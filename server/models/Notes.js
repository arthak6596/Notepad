import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type:String,
        required:false
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

const Notes = mongoose.model('Notes',NotesSchema)

export default Notes;