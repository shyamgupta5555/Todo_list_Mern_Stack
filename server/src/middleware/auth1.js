const jwt = require("jsonwebtoken");
const todoModel = require("../model/todoModel");

exports.authentication = async (req, res, next) => {
  try {
    let header = req.headers["authorization"];
    if (!header)
      return res
        .status(400)
        .send({ status: false, message: "jwt must be provided" });
    jwt.verify(header, "operationFrontend", (err, decoded) => {
      if (err)
        return res.status(401).send({ status: false, message: err.message });
      req.id = decoded.id;
      next();
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

exports.authorization = async (req, res, next) => {
  try {
    let user = req.id;
    let userId = req.body.adminName;
    let {id }=req.params
    if (userId) {
      // console.log(user ,userId)
      if (userId !== user)
        return res
          .status(400)
          .send({ status: false, message: "user id not valid" });
      next();
    } else {
      let todoData = await todoModel.findById({ _id: id });
      console.log(todoData)
      if (todoData.adminName != user)
        return res.status(400).send({ message: "user not exist" });
      next();
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
