import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getClimateSources } from '../../actions/climate';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import StorageIcon from '@material-ui/icons/Storage';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
    verticalAlign: 'top'
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const ClimateSources = ({
  getClimateSources,
  sources: { sources, loading },
  auth
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!loading) getClimateSources();
  }, [getClimateSources, loading]);

  return (
    <Fragment>
      <Typography
        component='h4'
        variant='h4'
        align='center'
        color='textPrimary'
        gutterBottom
      >
        Sources
      </Typography>

      {Object.keys(sources).length === 0 ? (
        <Spinner />
      ) : (
        <Fragment>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Data Set</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell>
                    <Typography>{sources.dataSet.label}</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography>
                      {sources.dataSet.description}

                      <a
                        href={sources.dataSet.url}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {sources.dataSet.url}
                      </a>
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Scenarios</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sources.scenario.map(scenario => (
                  <StyledTableRow key={scenario.name}>
                    <StyledTableCell>
                      <Typography>{scenario.label}</Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography>{scenario.description}</Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <List
            component='nav'
            aria-labelledby='nested-list-subheader'
            className={classes.root}
          >
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText primary='Climate Models' />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {sources.dataSet.models.map(climateModel => (
                  <ListItem className={classes.nested} key={climateModel}>
                    <ListItemText primary={climateModel} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
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
  sources: state.climate,
  auth: state.auth
});

export default connect(mapStateToProps, { getClimateSources })(ClimateSources);
