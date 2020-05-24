import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import SearchBar from 'src/components/SearchBar';
import Header from './Header';
import Results from './Results';
import NewOrder from './newOrder/newOrder';

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  results: {
    marginTop: theme.spacing(3),
  },
}));

function OrderManagementList() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [openNewOrder, setOpenNewOrder] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchOrders = () => {
      axios.get('/api/orders').then((response) => {
        if (mounted) {
          setOrders(response.data.orders);
        }
      });
    };

    fetchOrders();

    return () => {
      mounted = false;
    };
  }, []);

  const handleNewOrder = () => {
    setOpenNewOrder(true);
  };

  const onClose = () => {
    setOpenNewOrder(false);
  };

  return (
    <Page
      className={classes.root}
      title="Orders Management List"
    >
      <Container
        maxWidth={false}
        className={classes.container}
      >
        <Header handleNewOrder={handleNewOrder} />
        <SearchBar />
        <Results
          className={classes.results}
          orders={orders}
        />
      </Container>
      <NewOrder open={openNewOrder} onClose={onClose} />
    </Page>
  );
}

export default OrderManagementList;
