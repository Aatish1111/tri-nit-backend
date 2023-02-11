const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Parse request body as JSON
app.use(bodyParser.json());

// Define NGO schema
const ngoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  goal: {
    type: String,
    required: true
  },
  plan: {
    type: String,
    required: true
  },
  impact: {
    type: String,
    required: true
  },
  funding_needs: {
    type: Number,
    required: true
  }
});

// Create NGO model
const NGO = mongoose.model('NGO', ngoSchema);

// Create NGO profile
app.post('/ngo/create', (req, res) => {
  const { name, goal, plan, impact, funding_needs } = req.body;
  const newNGO = new NGO({ name, goal, plan, impact, funding_needs });
  newNGO.save()
    .then(ngo => res.json(ngo))
    .catch(err => res.status(400).json({ msg: 'Error creating profile' }));
});

// Get all NGOs
app.get("/ngos", (req, res) => {
    NGO.find()
      .sort({ date: -1 })
      .then((ngos) => res.json(ngos));
  });
  
  // Get a specific NGO
  app.get("/ngos/:id", (req, res) => {
    NGO.findById(req.params.id)
      .then((ngo) => res.json(ngo))
      .catch((err) => res.json(err));
  });
  
  // Add an NGO
  app.post("/ngos", (req, res) => {
    const newNGO = new NGO({
      name: req.body.name,
      description: req.body.description,
      area: req.body.area,
      website: req.body.website,
    });
  
    newNGO
      .save()
      .then((ngo) => res.json(ngo))
      .catch((err) => res.json(err));
  });
  
  // Update an NGO
  app.put("/ngos/:id", (req, res) => {
    NGO.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((ngo) => res.json(ngo))
      .catch((err) => res.json(err));
  });
  
  // Delete an NGO
  app.delete("/ngos/:id", (req, res) => {
    NGO.findByIdAndDelete(req.params.id)
      .then((ngo) => res.json(ngo))
      .catch((err) => res.json(err));
  });
  




module.exports = { NGO };