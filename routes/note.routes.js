const express= require("express");
const { NoteModel } = require("../model/note.model");
const { auth } = require("../middleware/auth.middleware");

const noteRouter= express.Router()
noteRouter.use(auth)
noteRouter.post("/create", async(req, res)=>{
    const payload= req.body;
    try {
        const note= new NoteModel(payload)
        await note.save()
        res.status(200).send({"msg":"A new note is Created"})
    } catch (error) {
        res.status(400).send({"error":error})
    }
})

noteRouter.get("/", async(req,res)=>{

    try {
        const notes=await NoteModel.find({username:req.body.username})
        res.status(200).send(notes)
    } catch (error) {
        res.status(400).send({"error":error})
    }
})

noteRouter.patch("/update/:noteId",async(req,res)=>{  
    //logged in user(id)====note document(userId) ===> check this condition (true)==>update
    const {noteId}= req.params;
    const note= await NoteModel.findOne({_id:noteId});
    const payload= req.body;
    try {
        if(req.body.userId===note.userId){
            await NoteModel.findByIdAndUpdate({_id:noteId},payload)
            res.status(200).send({"msg":`The note with noteId ${noteId} is updated`})
        }
        else{
            res.status(400).send({"msg":"You are not authorised"})
        }
    } catch (error) {
        res.status(400).send({"error":error})
    }
})
noteRouter.delete("/delete/:noteId",async(req,res)=>{
    //logged in user(id)====note document(userId) ===> check this condition (true)==>delete
    const {noteId}= req.params;
    const note= await NoteModel.findOne({_id:noteId});
    try {
        if(req.body.userId===note.userId){
            await NoteModel.findByIdAndDelete({_id:noteId})
            res.status(200).send({"msg":`The note with noteId ${noteId} is updated`})
        }
        else{
            res.status(400).send({"msg":"You are not authorised"})
        }
    } catch (error) {
        res.status(400).send({"error":error})
    }
    
})

module.exports={
    noteRouter
}