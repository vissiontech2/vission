import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
} from '@material-ui/core';
import Purchase from './newPurchaseTable';

const useStyles = makeStyles((theme) => ({
  root: {},
  alert: {
    marginBottom: theme.spacing(3),
  },
  formGroup: {
    marginBottom: theme.spacing(3),
  },
  fieldGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  fieldHint: {
    margin: theme.spacing(1, 0),
  },
  tags: {
    marginTop: theme.spacing(1),
    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
  dateField: {
    '& + &': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function AboutProject({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <Purchase />
    </Card>
  );
}

AboutProject.propTypes = {
  className: PropTypes.string,
};

export default AboutProject;
