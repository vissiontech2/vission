import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  colors,
  Grid
} from '@material-ui/core';
import axios from 'src/utils/axios';
import Label from 'src/components/Label';
import GenericMoreButton from 'src/components/GenericMoreButton';
import ReceivableEditModal from './payableEditModal'

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import _ from 'lodash';
import formatter from '../../../utils/currencyFormatter';
import { getSupplierPayables } from '../api';
import currencyFormatter from '../../../utils/currencyFormatter';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1150,
  },
}));

function Invoices({ className, ...rest }) {
  const classes = useStyles();
  const [payables, setPayables] = useState([]);
  const [payableModelOpen, setPayableModelOpen] = useState(false);
  const [editingPayable, setEditingPayable] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({});
  const [payment, setPayment] = useState(false);
  const [supplierId, setSupplierId] = useState('');

  useEffect(() => {
    let mounted = true;
    const fetchInvoices = () => {
      // eslint-disable-next-line no-restricted-globals
      const supplierId = location.search.replace('?id:', '');
      getSupplierPayables({ params: { id: supplierId } }).then((response) => {
        if (mounted) {
          setPayables(response.data.supplierPayables);
          setSupplierId(supplierId);
        }
      });
    };
    fetchInvoices();
    return () => {
      mounted = false;
    };
  }, []);


  const transactionTypeColors = {
    credit: colors.green[600],
    debit: colors.red[600],
  };

  const openReceivableEditModel = (id) => {
    setPayableModelOpen(true);
    setPayment(false);
    const editingPayable = payables.find((receivable) => receivable.id === id) || {};
    setEditingPayable(editingPayable);
  };

  const closeReceivableModal = () => {
    setPayableModelOpen(false);
  };

  const openPaymentModel = (id) => {
    setPayableModelOpen(true);
    setPayment(true);
  };

  const submitEdited = (data) => {
    console.log('editedReceivable', data);
  };

  const renderReceivableTable = () => <Card style={{ display: 'block', width: '100%' }}>
    <CardHeader
      action={<GenericMoreButton />}
      title="Supplier Payables"
    />
    <Divider />
    <CardContent className={classes.content}>
      <PerfectScrollbar>
        <div className={classes.inner}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Invoice Id</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Transaction Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Operator</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payables.map(recievable => (
                <TableRow key={recievable.id}>
                  <TableCell>#{recievable.id}</TableCell>
                  <TableCell>
                    {recievable.date}
                  </TableCell>
                  <TableCell>
                    {recievable.dueDate}
                  </TableCell>
                  <TableCell>
                    {recievable.invoiceId}
                  </TableCell>
                  <TableCell>{recievable.description}</TableCell>
                  <TableCell>
                    <Label
                      color={transactionTypeColors[recievable.transactionType]}
                      variant="outlined"
                    >
                      {recievable.transactionType}
                    </Label>
                  </TableCell>
                  <TableCell>
                    {currencyFormatter(recievable.amount)}
                  </TableCell>
                  <TableCell>
                    {recievable.cashier}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      color="primary"
                      // component={RouterLink}
                      size="small"
                      onClick={() => openReceivableEditModel(recievable.id)}
                      variant="outlined"
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PerfectScrollbar>
    </CardContent>
  </Card>

  const handleEditReveivable = (event) => {
    event.persist();
    setEditingPayable((currentValues) => ({
      ...currentValues,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    }));
  };

  const handlePaymentChange = (event) => {
    event.persist();
    setPaymentInfo((currentValues) => ({
      ...currentValues,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    }));
  };

  const renderAction = () => <Grid style={{ margin: 5 }} item>
    <Button
      className={classes.filterButton}
      color="primary"
      onClick={openPaymentModel}
      size="small"
      variant="outlined"
    >
      <AttachMoneyIcon />
        Payment
    </Button>
  </Grid>

  const handlePaymentSubmit = () => {
    axios.post('/sales/reveivables/payment', {
      paymentInfo: {
        ...paymentInfo,
        supplierId: +supplierId,
      },
    }).then((response) => {
      setPayables(response.data.customerReceivables);
    });
    setPayableModelOpen(false);
    setPayment(false);
  };

  const handleEditSubmit = () => {
    axios.post('/sales/reveivables/edit', { editingPayable }).then((response) => {
      setPayables(response.data.customerReceivables);
    });
    setPayableModelOpen(false);
    setPayment(false);
  };

  const renderBalance = () => {
    const credit = payables.filter((item) => item.transactionType === 'credit').map((item) => +item.amount);
    const debit = payables.filter((item) => item.transactionType === 'debit').map((item) => +item.amount);
    const balance = _.sum(credit) - _.sum(debit);
    return (
      <span style={{ float: 'right', marginRight: 10, fontWeight: 'bold', color: balance < 0 ? 'red' : 'green' }}>
        {formatter(balance)}
      </span>
    )
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {renderBalance()}
      {renderAction()}
      {renderReceivableTable()}
      <ReceivableEditModal handlePaymentSubmit={handlePaymentSubmit} handleEditSubmit={handleEditSubmit} paymentInfo={paymentInfo} handleEditReveivable={handleEditReveivable} handlePaymentChange={handlePaymentChange} payment={payment} open={payableModelOpen} submitEdited={submitEdited} onClose={closeReceivableModal} receivable={editingPayable} />
    </div>
  );
}

Invoices.propTypes = {
  className: PropTypes.string,
};

export default Invoices;
