import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getClimateSources } from '../../actions/climate';

const ClimateSources = ({
  getClimateSources,
  sources: { sources, loading },
  auth
}) => {
  useEffect(() => {
    if (Object.keys(sources).length === 0) getClimateSources();
  }, [getClimateSources]);

  return (
    <Fragment>
      {Object.keys(sources).length === 0 ? (
        <Spinner />
      ) : (
        <Fragment>
          <h3>Data Sources</h3>
          <table>
            <thead>
              <tr>
                <th>Data Set</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{sources.dataSet.label}</td>
                <td>
                  {sources.dataSet.description}
                  <p>
                    <a
                      href={sources.dataSet.url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {sources.dataSet.url}
                    </a>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

          <br />

          <table>
            <thead>
              <tr>
                <th>Scenarios</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {sources.scenario.map(scenario => (
                <tr>
                  <td>{scenario.label}</td>
                  <td>{scenario.description}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <br />

          <table>
            <thead>
              <tr>
                <th>Climate Models</th>
              </tr>
            </thead>
            <tbody>
              {sources.dataSet.models.map(climateModel => (
                <tr>
                  <td>{climateModel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
      )}
    </Fragment>
  );
};

ClimateSources.propTypes = {
  getClimateSources: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  sources: state.climate
});

export default connect(mapStateToProps, { getClimateSources })(ClimateSources);
