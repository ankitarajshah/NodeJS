const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  //validate req.body
  //create MongoDB UserModel
  //do password encryption
  //save data to mongodb
  //return response to the client

  registerUser: async (req, res) => {
    const userModel = new UserModel(req.body);
    userModel.password = await bcrypt.hash(req.body.password, 10);
    try {
      const response = await userModel.save();
      response.password = undefined;
      return res.status(201).json({ message: "success", data: response });
    } catch (error) {
      return res.status(500).json({ message: "error,err" });
    }

    //res.send("Success");
  },
  //check user using email
  //compare pw
  //create jwt token
  //send response to client

  loginUser: async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Auth failed , Invalid username/password" });
      }
      const isPassEqual = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPassEqual) {
        return res
          .status(401)
          .json({ message: "Auth failed , Invalid username/password" });
      }
      const tokenObject = {
        _id: user.id,
        fullName: user.fullName,
        email: user.email,
      };
      const jwtToken = jwt.sign(tokenObject, process.env.SECRETE, {
        expiresIn: "4h",
      });
      return res.status(200).json({ jwtToken, tokenObject });
    } catch (error) {
      return res.status(500).json({ message: "error", err });
    }

    //res.send("Login Success");
  },

  getUsers: async (req, res) => {
    try {
      const users = await UserModel.find({}, { password: 0 });
      return res.status(200).json({ data: users });
    } catch (error) {
      return res.status(500).json({ message: "err", error });
    }
  },
};
