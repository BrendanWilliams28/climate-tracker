const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const config = require('config');
const axios = require('axios');

const User = require('../../models/User');
const Project = require('../../models/Project');

// @route   POST api/projects
// @desc    Create project
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('city', 'City is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { title, description, city } = req.body;

    // Get City ID
    let cityId = null;
    let location = city.split(', ');
    try {
      const response = await axios({
        method: 'get',
        url: 'https://app.climate.azavea.com/api/city',
        headers: {
          Authorization: config.get('climateAuth')
        },
        params: {
          name: location[0],
          admin: location[1]
        }
      });

      cityId = response.data.features[0].id;
    } catch (error) {
      console.error(error);
    }

    // Get Scenario
    let scenario = null;
    try {
      const response = await axios({
        method: 'get',
        url: 'https://app.climate.azavea.com/api/scenario',
        headers: {
          Authorization: config.get('climateAuth')
        }
      });

      scenario = response.data[2].name;
    } catch (error) {
      console.error(error);
    }

    // Get Dataset & Models
    let dataSet = null;
    let dataModels = [];
    try {
      const response = await axios({
        method: 'get',
        url: 'https://app.climate.azavea.com/api/dataset',
        headers: {
          Authorization: config.get('climateAuth')
        }
      });

      dataSet = response.data[1].name;
      let tempModels = response.data[1].models;
      dataModels = tempModels.map(el => ({
        name: el
      }));
    } catch (error) {
      console.error(error);
    }

    // Save default Climate API settings
    try {
      const newProject = new Project({
        user: req.user.id,
        title,
        description,
        cityId,
        city,
        scenario,
        dataSet,
        dataModels
      });

      const project = await newProject.save();

      res.json(project);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/projects
// @desc     Edit a project
// @access   Private
router.put(
  '/:id',
  [
    auth,
    [
      check('city', 'City is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const project = await Project.findById(req.params.id);

      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }

      let { title, city } = req.body;

      // Get City ID
      let cityId = null;
      let location = city.split(', ');
      try {
        const response = await axios({
          method: 'get',
          url: 'https://app.climate.azavea.com/api/city',
          headers: {
            Authorization: config.get('climateAuth')
          },
          params: {
            name: location[0],
            admin: location[1]
          }
        });

        cityId = response.data.features[0].id;
      } catch (error) {
        console.error(error);
      }

      try {
        project.title = title;
        project.cityId = cityId;
        project.city = city;

        await project.save();

        res.json({ msg: 'Project updated' });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    } catch (error) {
      console.error(error.message);

      if (error.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Project not found' });
      }

      res.status(500).send('Server Error');
    }
  }
);

// @route  GET api/projects
// @desc   Get all projects
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find().sort({ title: 1 });
    res.json(projects);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/projects/user
// @desc   Get current users projects
// @access Private
router.get('/user', auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });

    if (!projects) {
      return res
        .status(400)
        .json({ msg: 'There are no projects for this user' });
    }

    res.json(projects);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/projects/:id
// @desc   Get projects by ID
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route  GET api/projects/user/:use_id
// @desc   Get projects by user ID
// @access Private
router.get('/user/:user_id', auth, async (req, res) => {
  try {
    const projects = await Project.find({
      user: req.params.user_id
    }).populate('users', ['name', 'email']);

    if (!projects)
      return res
        .status(400)
        .json({ msg: 'There are no projects for this user' });

    res.json(projects);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route  DELETE api/projects/:id
// @desc   Delete a project
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Check user
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await project.remove();

    res.json({ msg: 'Project removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
