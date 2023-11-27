const express = require("express");
const User = require("../models/userModel");
const router = express.Router();

//create data
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const userData = await User.create({
      name: name,
      email: email,
      age: age,
    });

    res.status(201).json(userData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get data
router.get("/", async (req, res) => {
  try {
    const getData = await User.find();
    res.status(200).json(getData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get single data
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getSingleData = await User.findById({ _id: id });
    res.status(200).json(getSingleData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//delete data
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteData = await User.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//update data
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const updateData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
