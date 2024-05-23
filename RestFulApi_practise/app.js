const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
require("./src/database/conn");

const WomensRanking = require("./src/models/womens");

app.get("/", async (req, res) => {
  res.send("Hello from app");
});
//new data add post
app.post("/womens", async (req, res) => {
  try {
    const womenData = new WomensRanking(req.body);
    console.log(womenData, "womenData");
    const result = await womenData.save();
    console.log(result, "result");
    res.status(201).send(result);
  } catch (error) {
    console.error("Error adding athlete:", error);
    res.status(500).send("Error adding athlete");
  }
});

// get data
app.get("/womens", async (req, res) => {
  try {
    const getwomens = await WomensRanking.find({}).sort({
      ranking: 1,
    });
    res.status(201).send(getwomens);
  } catch (error) {
    // If an error occurs, log it
    console.error("Error fetching data:", error);
    // Send an appropriate error response
    res.status(500).json({ error: "Error fetching data" });
  }
});
//find by id and sort
app.get("/womens/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getWomemById = await WomensRanking.findById({ _id: id });
    if (!id) {
      res.status(404).json({ error: "Id not found" });
    }
    res.status(201).send(getWomemById);
  } catch (error) {
    // If an error occurs, log it
    console.error("Error fetching data:", error);
    // Send an appropriate error response
    res.status(500).json({ error: "Error fetching data" });
  }
});
//update

app.patch("/womens/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedWomen = await WomensRanking.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!id) {
      res.status(404).json({ error: "Id not found" });
    }
    if (!updatedWomen) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.status(201).send(updatedWomen);
  } catch (error) {
    // If an error occurs, log it
    console.error("Error updating data:", error);
    // Send an appropriate error response
    res.status(500).json({ error: "Error updating data" });
  }
});

//delete
app.delete("/womens/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedWomen = await WomensRanking.findByIdAndDelete(id);
    if (!deletedWomen) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.send(deletedWomen);
  } catch (error) {
    // If an error occurs, log it
    console.error("Error deleting data:", error);
    // Send an appropriate error response
    res.status(500).json({ error: "Error deleting data" });
  }
});
app.listen(port, () => {
  console.log(`connection port :${port}`);
});
