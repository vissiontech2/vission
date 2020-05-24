import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Grid } from '@material-ui/core';
import Page from 'src/components/Page';
import {
  useLocation,
  useHistory,
} from 'react-router-dom';
import Header from './Header';
import OrderInfo from './OrderInfo';
import OrderItems from './OrderItems';
import { getPurchaseDetails } from '../api';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  grid: {
    marginTop: theme.spacing(2),
  },
}));

function OrderManagementDetails() {
  const classes = useStyles();
  const [purchase, setPurchase] = useState(null);

  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    let mounted = true;
    const fetchOrder = () => {
      getPurchaseDetails({ params: { id: location.search.replace('?id:', '') } }).then((response) => {
        if (!Object.keys(response.data.purchase).length) {
          history.replace('/purchases/orders');
        }
        if (mounted) {
          setPurchase(response.data.purchase);
        }
      });
    };

    fetchOrder();

    return () => {
      mounted = false;
    };
  }, [location.search, history]);

  if (!purchase) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Order Management Details"
    >
      <Container maxWidth={false}>
        <Header purchase={purchase} />
        <Grid
          className={classes.grid}
          container
          spacing={3}
        >
          <Grid
            item
            md={4}
            xl={3}
            xs={12}
          >
            <OrderInfo purchase={purchase} />
          </Grid>
          <Grid
            item
            md={8}
            xl={9}
            xs={12}
          >
            <OrderItems purchase={purchase} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default OrderManagementDetails;
