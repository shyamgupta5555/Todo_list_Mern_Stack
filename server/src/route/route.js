const route = require("express").Router()
const {createTodo,updateTodo,getData,deleteTodo,getDataById} = require("../controller/todoController")
const {userCreate,login} = require("../controller/userController")
const {authentication,authorization}  = require("../middleware/auth1")


route.post("/api/register" ,userCreate)
route.post("/api/login" ,login)

route.post("/api/:id/todo",authentication,authorization ,createTodo)
route.get("/api/todo" ,getData)
route.get("/api/todo/:id" ,authentication,authorization,getDataById)

route.put("/api/todo/:id",authentication,authorization ,updateTodo)
route.delete("/api/todo/:id",authentication,authorization ,deleteTodo)

module.exports = route