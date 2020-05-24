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
import Recievables from './Recievables';
import { getCustomerSummary, editCustomer } from '../api';


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

function CustomerManagementDetails() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState('summary');
  const tabs = [
    { value: 'summary', label: 'Summary' },
    { value: 'invoices', label: 'Invoices' },
    { value: 'receivables', label: 'Recievables' },
  ];

  const [customer, setCustomer] = useState();
  const history = useHistory();

  useEffect(() => {
    let mounted = true;

    const fetchCustomer = () => {
      // eslint-disable-next-line no-restricted-globals
      getCustomerSummary({ params: { id: location.search.replace('?id:', '') } }).then((response) => {
        if (Object.keys(response.data.customer).length && mounted) {
          setCustomer(response.data.customer);
        } else {
          // eslint-disable-next-line no-restricted-globals
          history.push('/sales/customers');
        }
      });
    };

    fetchCustomer();

    return () => {
      mounted = false;
    };
  }, [history]);

  if (!customer) {
    return null;
  }

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const submitEditedCustomerInfo = (newCustomerInfo) => {
    editCustomer(newCustomerInfo).then((response) => {
      if (Object.keys(response.data.customer).length) {
        setCustomer(response.data.customer);
      } else {
        // eslint-disable-next-line no-restricted-globals
        history.push('/sales/customers');
      }
    });
  };

  return (
    <Page
      className={classes.root}
      title="Customer Management Details"
    >
      <Container maxWidth={false}>
        <Header customerName={customer.name} />
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
          {currentTab === 'summary' && <Summary onCustomerEditSubmit={submitEditedCustomerInfo} customer={customer} />}
          {currentTab === 'invoices' && <Invoices />}
          {currentTab === 'receivables' && <Recievables />}
        </div>
      </Container>
    </Page>
  );
}

CustomerManagementDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default CustomerManagementDetails;
