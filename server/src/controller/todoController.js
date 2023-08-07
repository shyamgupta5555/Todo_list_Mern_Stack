const user = require("../model/userModel");
const todo = require("../model/todoModel");

exports.createTodo = async (req, res) => {
  try {
    const data = req.body;
    const create = await todo.create(data);
    return res.status(201).send({ create: data });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.getData = async (req, res) => {
  try {
    const data = await todo.find({isDeleted :false});
    return res.status(200).send({ data: data });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.getDataById = async (req, res) => {
  try {
    const { id }= req.params
    const data = await todo.findOne({_id:id});
    console.log(data);
    return res.status(200).send({ data: data });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};


exports.updateTodo = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id
    const update = await todo.findOneAndUpdate({_id:id},data,{new:true});
    return res.status(200).send({ create: update });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};


exports.deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteData = await todo.findOneAndUpdate({_id:id} ,{isDeleted :true},{new:true});
    return res.status(201).send({ message:"successful delete" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
