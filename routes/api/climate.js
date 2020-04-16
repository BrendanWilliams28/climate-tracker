const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const config = require('config');
const axios = require('axios');

// @route  GET api/climate/indicator
// @desc   Get Indicator List
// @access Private
router.get('/indicator', auth, async (req, res) => {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://app.climate.azavea.com/api/indicator',
      headers: {
        Authorization: config.get('climateAuth')
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/climate/climate-data/{city}/{scenario}/indicator/{indicator_name}/
// @desc   Get Indicator Data by City
// @access Private
router.get(
  '/climate-data/:city/:scenario/indicator/:indicator_name/',
  auth,
  async (req, res) => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://app.climate.azavea.com/api/climate-data/${req.params.city}/${req.params.scenario}/indicator/${req.params.indicator_name}/`,
        headers: {
          Authorization: config.get('climateAuth')
        }
      });

      res.json(response.data);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
