import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Container,
  Tabs,
  Tab,
  Divider,
  colors,
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useHistory } from 'react-router';
import Header from './Header';
import Summary from './Summary';
import Invoices from './Invoices';
import Payables from './payables';
import { getSupplierSummary, editSupplier } from '../api';


const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  tabs: {
    marginTop: theme.spacing(3),
  },
  divider: {
    backgroundColor: colors.grey[300],
  },
  content: {
    marginTop: theme.spacing(3),
  },
}));

function SupplierManagementDetails() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState('summary');
  const tabs = [
    { value: 'summary', label: 'Summary' },
    { value: 'invoices', label: 'Invoices' },
    { value: 'payables', label: 'Payables' },
  ];

  const [supplier, setSupplier] = useState();
  const history = useHistory();

  useEffect(() => {
    let mounted = true;

    const fetchsupplier = () => {
      // eslint-disable-next-line no-restricted-globals
      getSupplierSummary({ params: { id: location.search.replace('?id:', '') } }).then((response) => {
        if (Object.keys(response.data.supplier).length && mounted) {
          setSupplier(response.data.supplier);
        } else {
          // eslint-disable-next-line no-restricted-globals
          history.push('/purchases/suppliers');
        }
      });
    };

    fetchsupplier();

    return () => {
      mounted = false;
    };
  }, [history]);

  if (!supplier) {
    return null;
  }

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const submitEditedsupplierInfo = (newsupplierInfo) => {
    editSupplier(newsupplierInfo).then((response) => {
      if (Object.keys(response.data.supplier).length) {
        setSupplier(response.data.supplier);
      } else {
        // eslint-disable-next-line no-restricted-globals
        history.push('/sales/suppliers');
      }
    });
  };

  return (
    <Page
      className={classes.root}
      title="supplier Management Details"
    >
      <Container maxWidth={false}>
        <Header supplierName={supplier.name} />
        <Tabs
          className={classes.tabs}
          onChange={handleTabsChange}
          scrollButtons="auto"
          value={currentTab}
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
            />
          ))}
        </Tabs>
        <Divider className={classes.divider} />
        <div className={classes.content}>
          {currentTab === 'summary' && <Summary onsupplierEditSubmit={submitEditedsupplierInfo} supplier={supplier} />}
          {currentTab === 'invoices' && <Invoices />}
          {currentTab === 'payables' && <Payables />}
        </div>
      </Container>
    </Page>
  );
}

SupplierManagementDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default SupplierManagementDetails;
