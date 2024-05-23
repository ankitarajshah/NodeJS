const express = require("express");
const mongoose = require("mongoose");

const womenSchema = new mongoose.Schema({
  ranking: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dob: {
    type: Date,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  score: {
    type: Number,
    required: true,
    trim: true,
  },
  event: {
    type: String,
    default: "100m",
  },
});

//new collection
const WomensRanking = new mongoose.model("WomensRanking", womenSchema);

module.exports = WomensRanking;
