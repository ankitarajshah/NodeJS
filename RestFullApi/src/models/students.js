const mongoose = require("mongoose");
const validator = require("validator");

const studentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email id is already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  phone: {
    type: Number,
    min: 10,

    required: true,
    unique: [true, "No Duplacte phone number allowed"],
  },
  address: {
    type: String,
    required: true,
  },
});

// we will create new collection
const Student = new mongoose.model("Student", studentsSchema);

module.exports = Student;
