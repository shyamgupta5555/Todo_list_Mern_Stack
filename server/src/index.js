const express = require("express")
const app = express()
const mongoose = require("mongoose")
const route = require("./route/route")

const cors = require("cors")
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://shyamgupta:.T!8NRrzf6FyMYc@cluster0.dbdyccj.mongodb.net/todoList").then(()=>{
  console.log("mongodb is connect")
}).catch((err)=>{
  console.log(err.message)
})

app.use("/",route)

app.listen(5050 ,(err)=>{
  if(err)console.log(err.message)
  console.log("Application running port :" ,5050)
})