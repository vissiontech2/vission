import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import CustomerInfo from './CustomerInfo';
import Invoices from './Invoices';
import SendEmails from './SendEmails';

const useStyles = makeStyles(() => ({
  root: {},
}));

function Summary({
  className, customer, onCustomerEditSubmit, ...rest
}) {
  const classes = useStyles();
  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <CustomerInfo onCustomerEditSubmit={onCustomerEditSubmit} customer={customer} />
      </Grid>
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <Invoices invoice={customer.invoice} />
      </Grid>
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <SendEmails emails={customer.emails} />
      </Grid>
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        {/* <OtherActions /> */}
      </Grid>
    </Grid>
  );
}

Summary.propTypes = {
  className: PropTypes.string,
};

export default Summary;
