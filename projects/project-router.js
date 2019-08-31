const express = require('express');

const Projects = require('./project-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.find()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get project' });
    });
  });

  router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    Projects.findById(id)
    .then(project => {
  
      if (user) {
        res.json(project);
      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get project' });
    });
  });

  router.post('/', (req, res) => {
    const projectData = req.body;
  
    Projects.add(projectData)
    .then(newProject => {
      res.status(201).json(newProject);
    })
    .catch(error => {
      res.status(500).json({ message: 'Failed to create new project' });
    });
  });
  
  

module.exports = router;