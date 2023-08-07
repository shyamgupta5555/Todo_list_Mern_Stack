const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.userCreate = async (req, res) => {
  try {
    let data = req.body;
    const { email, phone, password, name } = data;

    data.name = name.toUpperCase();

    const check = await userModel.findOne({ email: email });

    if (check)
      return res.status(400).send({
        message: "This mail already exist try to next another mail",
      });

    const checkNumber = await userModel.findOne({ phone: phone });
    if (checkNumber)
      return res.status(400).send({
        message: "This phone number already exist try to next another number",
      });

    const passwordHas = await bcrypt.hash(password, 10);
    data.password = passwordHas;
    const create = await userModel.create(data);

    return res.status(201).send({ data: create });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    
    const data = req.body;
    const { email, password } = data;

    const check = await userModel.findOne({ email: email });
    if (!check) return res.status(404).send({ message: "This mail wrong" });

    const matchPassword = await bcrypt.compare(password, check.password);
    if (!matchPassword)
      return res.status(400).send({ message: "password is wrong" });

    const token = jwt.sign(
      { id: check._id, name: check.name, profileImage: check.profileImage },
      "operationFrontend");
    const obj = { id: check.id, token: token, expireToken: "1h" };
    return res.status(200).send(obj);

  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};