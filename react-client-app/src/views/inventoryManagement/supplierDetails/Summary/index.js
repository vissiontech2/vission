import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import SupplierInfo from './supplierInfo';
import Invoices from './Invoices';
import SendEmails from './SendEmails';

const useStyles = makeStyles(() => ({
  root: {},
}));

function Summary({
  className, supplier, onsupplierEditSubmit, ...rest
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
        <SupplierInfo onsupplierEditSubmit={onsupplierEditSubmit} supplier={supplier} />
      </Grid>
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <Invoices invoice={supplier.invoice} />
      </Grid>
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <SendEmails emails={supplier.emails} />
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
