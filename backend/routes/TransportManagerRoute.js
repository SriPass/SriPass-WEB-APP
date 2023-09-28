const express = require("express");
const router = express.Router();
const Manager = require("../models/transportManagerModel")


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find a driver with the given email and password
      const manager = await Manager.findOne({ email, password });
  
      if (manager) {
        // Create a response object with the manager's name, email, and ID
        const currentManager = {
          name: manager.name,
          email: manager.email,
          _id: manager._id,
        };
  
        // Send the response object back to the client
        res.send(currentManager);
      } else {
        // If no manager was found, send an error message
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      // If an error occurred, send a generic error message
      res.status(500).json({ message: "Something went wrong" });
    }
  });


  //register new manager
router.post("/addManager", async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const managerExist = await Manager.findOne({ email });
  
      if (managerExist) {
        return res.status(400).json({ message: "Manager already exists" });
      } else {
        const newManager = new Manager({
          name,
          email,
          password,
        });
  
        await newManager.save();
        res.status(201).json({ message: "New manager created" });
      }
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  });
  


  module.exports = router;