import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
  colors,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
  },
  deleteButton: {
    color: theme.palette.common.white,
    backgroundColor: colors.red[600],
    '&:hover': {
      backgroundColor: colors.red[900],
    },
  },
  deleteIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Header({ purchase, className, ...rest }) {
  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="flex-end"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            Purchases
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Order #
            {purchase.id}
          </Typography>
        </Grid>
        {/* <Grid item>
          <Button
            className={classes.deleteButton}
            variant="contained"
          >
            <DeleteIcon className={classes.deleteIcon} />
            Delete
          </Button>
        </Grid> */}
      </Grid>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  purchase: PropTypes.object.isRequired,
};

export default Header;
