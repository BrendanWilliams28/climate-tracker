import React, { Fragment } from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const LineChart = ({ data }) => {
  let chartData = {};

  let cityData = {};

  let metaData = {};

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

    chartData.labels.forEach(
      dataPoint => (
        dataPointsAverage.push(data.data[dataPoint].avg.toFixed(1)),
        dataPointsMin.push(data.data[dataPoint].min.toFixed(1)),
        dataPointsMax.push(data.data[dataPoint].max.toFixed(1))
      )
    );

    chartData.datasets = [
      {
        label: 'Minimum',
        fill: 1,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataPointsMin
      },
      {
        label: 'Average',
        fill: 1,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataPointsAverage
      },
      {
        label: 'Maximum',
        fill: 1,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataPointsMax
      }
    ];
  }

  return (
    <Fragment>
      <div>
        {Object.keys(chartData).length === 0 ? (
          <b>No chart data</b>
        ) : (
          <Line data={chartData} />
        )}
      </div>
    </Fragment>
  );
};

LineChart.propTypes = {
  data: PropTypes.object.isRequired
};

export default LineChart;
