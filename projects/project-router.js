const express = require('express');

const Schemes = require('./project-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    projects.find()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get project' });
    });
  });

module.exports = router;