import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
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
} from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import { getSupplierInvoices } from '../api';
import currencyFormatter from '../../../utils/currencyFormatter';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 30,
  },
  inner: {
    minWidth: 1150,
  },
}));

function Invoices({ className, ...rest }) {
  const classes = useStyles();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchInvoices = () => {
      // eslint-disable-next-line no-restricted-globals
      getSupplierInvoices({ params: { id: location.search.replace('?id:', '') } }).then((response) => {
        if (mounted) {
          setInvoices(response.data.supplierInvoices);
        }
      });
    };

    fetchInvoices();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="Customer invoices"
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
                    <TableCell>Payable Id</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        #
                        {invoice.id}
                      </TableCell>
                      <TableCell>
                        {moment(invoice.date).format('DD/MM/YYYY | HH:MM')}
                      </TableCell>
                      <TableCell>{invoice.payableId}</TableCell>
                      <TableCell>{currencyFormatter(invoice.total)}</TableCell>
                      {/* <TableCell>
                        {invoice.currency}
                        {invoice.value}
                      </TableCell>
                      <TableCell>
                        <Label
                          color={statusColors[invoice.status]}
                          variant="outlined"
                        >
                          {invoice.status}
                        </Label>
                      </TableCell> */}
                      <TableCell align="right">
                        <Button
                          color="primary"
                          component={RouterLink}
                          size="small"
                          to="/invoices/1"
                          variant="outlined"
                        >
                          View
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
    </div>
  );
}

Invoices.propTypes = {
  className: PropTypes.string,
};

export default Invoices;
