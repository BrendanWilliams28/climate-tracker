const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const config = require('config');
const axios = require('axios');
const _ = require('lodash');

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

// @route  GET api/climate/climate-data/{city}/{scenario}/indicator/{indicator_name}/?years
// @desc   Get Indicator Data by City
// @access Private
router.get(
  '/climate-data/:city/:scenario/indicator/:indicator_name/',
  auth,
  async (req, res) => {
    try {
      const years = req.query.years.split(':');
      const startYear = parseInt(years[0]);
      const endYear = parseInt(years[1]);

      let response;
      if (startYear >= 2006) {
        response = await axios({
          method: 'get',
          url: `https://app.climate.azavea.com/api/climate-data/${req.params.city}/${req.params.scenario}/indicator/${req.params.indicator_name}/?years=${startYear}:${endYear}`,
          headers: {
            Authorization: config.get('climateAuth')
          }
        });
      } else {
        const [historicalData, projectionData] = await axios.all([
          axios({
            method: 'get',
            url: `https://app.climate.azavea.com/api/climate-data/${req.params.city}/historical/indicator/${req.params.indicator_name}/?years=${startYear}:${endYear}`,
            headers: {
              Authorization: config.get('climateAuth')
            }
          }),
          axios({
            method: 'get',
            url: `https://app.climate.azavea.com/api/climate-data/${req.params.city}/${req.params.scenario}/indicator/${req.params.indicator_name}/?years=${startYear}:${endYear}`,
            headers: {
              Authorization: config.get('climateAuth')
            }
          })
        ]);

        response = _.merge(historicalData, projectionData);
      }

      res.json(response.data);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
