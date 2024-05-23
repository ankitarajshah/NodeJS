const express = require("express");
const router = new express.Router();

const Student = require("../models/students");
router.get("/", (req, res) => {
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

router.post("/students", async (req, res, next) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (error) {
    res.status(400).send(error);
  }
});
//read data of registered students
router.get("/students", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.send(studentsData);
  } catch (error) {
    console.log(error);
  }
});
//get inidividual student data
router.get("/students/:id", async (req, res) => {
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

router.delete("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the ID is valid
    if (!id) {
      return res.status(400).send("Invalid ID");
    }

    // Find the student by ID and delete it
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

//update student by id

router.patch("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    console.log(updatedStudent, "updated ...");
    res.send(updatedStudent);
  } catch (error) {
    console.log(error);
    console.log(error);
    res.status(404).send("Page not found");
  }
});

module.exports = router;
