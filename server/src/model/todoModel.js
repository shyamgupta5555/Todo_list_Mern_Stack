const mongoose = require("mongoose");

const createTodo = mongoose.Schema(
  {
    title: String,
    task: String,
    status: { type: String, enum: ["pending", "done"] },
    adminName: { type: mongoose.Schema.ObjectId, ref: "user" },
    memberName: String,
    date : {type :String ,default :new Date().toISOString().slice(0, 10)},
    isDeleted :{type :Boolean , default :false}
  },
  { timeStamp: true }
);

module.exports = mongoose.model("todo", createTodo);
