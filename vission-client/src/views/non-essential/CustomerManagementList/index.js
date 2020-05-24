import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import SearchBar from 'src/components/SearchBar';
import Header from './Header';
import Results from './Results';
import CustomerEditModal from '../CustomerManagementDetails/Summary/CustomerEditModal';

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
  const [openNewCusWindow, setOpenNewCusWindow] = React.useState(false);


  const handleFilter = () => { };

  const handleSearch = () => { };

  useEffect(() => {
    let mounted = true;

    const fetchCustomers = () => {
      axios.get('/api/management/customers').then((response) => {
        if (mounted) {
          setCustomers(response.data.customers);
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

  return (
    <Page
      className={classes.root}
      title="Customer Management List"
    >
      <Container maxWidth={false}>
        <Header handleNewOpen={handleNewOpen} />
        <SearchBar
          onFilter={handleFilter}
          onSearch={handleSearch}
        />
        {customers && (
          <Results
            className={classes.results}
            customers={customers}
          />
        )}
      </Container>
      <CustomerEditModal
        customer={{}}
        onClose={handleNewClose}
        open={openNewCusWindow}
      />
    </Page>
  );
}

export default CustomerManagementList;
