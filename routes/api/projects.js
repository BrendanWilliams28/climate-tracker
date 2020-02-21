const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const config = require('config');
const axios = require('axios');

const util = require('util');

const User = require('../../models/User');
const Project = require('../../models/Project');

// @route   POST api/projects
// @desc    TEST route
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
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
      const user = await User.findById(req.user.id).select('-password');

      const newProject = new Project({
        user: req.user.id,
        title,
        description,
        cityId,
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

module.exports = router;
