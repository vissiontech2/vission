import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import Page from 'src/components/Page';
import SearchBar from 'src/components/SearchBar';
import Header from './Header';
import Results from './Results';
import CustomerEditModal from '../customerDetails/Summary/CustomerEditModal';
import { getAllCustomers, createCustomer } from '../api';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  results: {
    marginTop: theme.spacing(3),
  },
}));

function CustomerManagementList() {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [openNewCusWindow, setOpenNewCusWindow] = React.useState(false);


  // const handleFilter = () => { };

  const handleSearch = () => { };

  useEffect(() => {
    let mounted = true;

    const fetchCustomers = async () => {
      await getAllCustomers().then((response) => {
        if (mounted) {
          setCustomers(response.data.customers);
          setFilteredCustomers(response.data.customers);
        }
      });
    };

    fetchCustomers();

    return () => {
      mounted = false;
    };
  }, []);

  const handleNewOpen = (e) => {
    setOpenNewCusWindow(true);
  };

  const handleNewClose = (e) => {
    setOpenNewCusWindow(false);
  };

  const handleCustomerEdit = async (data) => {
    await createCustomer(data).then((response) => {
      setCustomers(response.data.customers);
    });
    handleNewClose();
  };

  const handleFilter = (e) => {
    const stringfiedArray = customers.map((order) => JSON.stringify(order));
    const filteredCustomers = stringfiedArray.filter((item) => item.toLowerCase().search(e.target.value.toLowerCase()) !== -1);
    setFilteredCustomers(filteredCustomers.map((item) => JSON.parse(item)));
  };

  return (
    <Page
      className={classes.root}
      title="Customer Management List"
    >
      <Container maxWidth={false}>
        <Header handleNewOpen={handleNewOpen} />
        <SearchBar
          onFilter={() => { }}
          onSearch={handleSearch}
          handleFilter={handleFilter}
        />
        {customers && (
          <Results
            className={classes.results}
            customers={filteredCustomers}
          />
        )}
      </Container>
      <CustomerEditModal
        customer={{
          discountedPrices: false,
          email: '',
          location: '',
          name: '',
          phone: '',
          verified: false,
        }}
        onClose={handleNewClose}
        open={openNewCusWindow}
        onSubmit={handleCustomerEdit}
      />
    </Page>
  );
}

export default CustomerManagementList;
