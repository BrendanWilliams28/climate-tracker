import React, { Fragment } from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const LineChart = ({ data }) => {
  let chartData = {};

  let cityData = {};

  let metaData = {};

  let chartOptions = {};

  if (data) {
    cityData.latitude = data.city.geometry.coordinates[0];
    cityData.longitude = data.city.geometry.coordinates[1];

    cityData.population = data.city.properties.population;

    metaData.label = data.indicator.label;
    metaData.description = data.indicator.description;

    metaData.time_aggregation = data.time_aggregation;
    metaData.units = data.units;

    // Load chart data
    chartData.labels = Object.keys(data.data);

    let dataPointsAverage = [];
    let dataPointsMin = [];
    let dataPointsMax = [];

    chartData.labels.forEach(dataPoint => {
      dataPointsAverage.push(data.data[dataPoint].avg.toFixed(1));
      dataPointsMin.push(data.data[dataPoint].min.toFixed(1));
      dataPointsMax.push(data.data[dataPoint].max.toFixed(1));
    });

    chartData.datasets = [
      {
        label: 'Minimum',
        fill: 1,
        pointRadius: 5,
        pointHoverRadius: 10,
        backgroundColor: 'rgba(102,153,0,0.4)',
        borderColor: 'rgba(51,153,0,1)',
        data: dataPointsMin
      },
      {
        label: 'Average',
        fill: false,
        pointRadius: 5,
        pointHoverRadius: 10,
        backgroundColor: 'rgba(255,0,0,0.4)',
        borderColor: 'rgba(204,0,0,1)',
        data: dataPointsAverage
      },
      {
        label: 'Maximum',
        fill: 1,
        pointRadius: 5,
        pointHoverRadius: 10,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        data: dataPointsMax
      }
    ];

    chartOptions = {
      legend: {
        display: true,
        labels: {
          fontStyle: 'bold'
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Years',
              fontStyle: 'bold'
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: `Units: ${metaData.units}`,
              fontStyle: 'bold'
            }
          }
        ]
      }
    };
  }

  return (
    <Fragment>
      <div>
        {Object.keys(chartData).length === 0 ? (
          <b>No chart data</b>
        ) : (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>
    </Fragment>
  );
};

LineChart.propTypes = {
  data: PropTypes.object.isRequired
};

export default LineChart;
