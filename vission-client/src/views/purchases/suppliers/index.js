import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import Page from 'src/components/Page';
import SearchBar from 'src/components/SearchBar';
import Header from './Header';
import Results from './Results';
import SuppliedEditModal from '../supplierDetails/Summary/supplierEditModal';
import { getAllSuppliers, createSupplier } from '../api';

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
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [openNewCusWindow, setOpenNewCusWindow] = React.useState(false);


  // const handleFilter = () => { };

  const handleSearch = () => { };

  useEffect(() => {
    let mounted = true;

    const fetchCustomers = async () => {
      await getAllSuppliers().then((response) => {
        if (mounted) {
          setSuppliers(response.data.suppliers);
          setFilteredSuppliers(response.data.suppliers);
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
    await createSupplier(data).then((response) => {
      setSuppliers(response.data.customers);
    });
    handleNewClose();
  };

  const handleFilter = (e) => {
    const stringfiedArray = suppliers.map((supplier) => JSON.stringify(supplier));
    const filteredSuppliers = stringfiedArray.filter((item) => item.toLowerCase().search(e.target.value.toLowerCase()) !== -1);
    setFilteredSuppliers(filteredSuppliers.map((item) => JSON.parse(item)));
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
        {suppliers && (
          <Results
            className={classes.results}
            suppliers={filteredSuppliers}
          />
        )}
      </Container>
      <SuppliedEditModal
        customer={{
          discountedPrices: false,
          email: '',
          location: '',
          name: '',
          phone: '',
          verified: false,
        }}
        title="New Supplier"
        onClose={handleNewClose}
        open={openNewCusWindow}
        onSubmit={handleCustomerEdit}
      />
    </Page>
  );
}

export default CustomerManagementList;
