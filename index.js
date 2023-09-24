const express= require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/note.routes");
require("dotenv").config();

const cors = require("cors")
const app= express();
app.use(express.json())
app.use(cors())
app.use("/users", userRouter)
app.use("/notes", noteRouter)


app.get("/",(req,res)=>{
    res.status(200).send({"msg":"This is the Home "})
})
const a=5


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to the DB")
        console.log(`Server is running on Port ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
})