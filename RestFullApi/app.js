const express = require("express");
const app = express();
app.use(express.json());
require("./src/database/conn");
const mongoose = require("mongoose");
const Student = require("./src/models/students");

app.get("/", (req, res) => {
  res.send("Rooot page");
});
//create new students
// app.post("/students", (req, res, next) => {
//   console.log(req.body);
//   const user = new Student(req.body);

//   user
//     .save()
//     .then((res) => {
//       console.log(res);
//       // res.status(201);
//       res.send(user);
//     })
//     .catch((err) => {
//       console.log(err);
//        res.status(400).send(err);
//     });
//   res.send("Hello other side");
// });

app.post("/students", async (req, res, next) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (error) {
    res.status(400).send(error);
  }
});
//read data of registered students
app.get("/students", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.send(studentsData);
  } catch (error) {
    console.log(error);
  }
});
//get inidividual student data
app.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id, "gives id of student");

    // // Check if _id is a valid ObjectId
    // if (!mongoose.Types.ObjectId.isValid(_id)) {
    //   return res.status(400).send("Invalid student ID");
    // }

    const studentData = await Student.findById(_id);
    console.log(studentData, "student data with id");

    if (!studentData) {
      return res.status(404).send();
    } else {
      res.send(studentData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
//delete record

app.delete("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the ID is valid
    if (!id) {
      return res.status(400).send("Invalid ID");
    }

    // Find the student by ID
    const deleteStudent = await Student.findByIdAndDelete(id);

    // Check if the student was found and deleted
    if (!deleteStudent) {
      return res.status(404).send("Student not found");
    }

    // Send a success response
    res.send("Student deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
