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
  colors,
} from '@material-ui/core';
import axios from 'src/utils/axios';
import Label from 'src/components/Label';
import GenericMoreButton from 'src/components/GenericMoreButton';

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
  const [receivables, setReceivables] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchInvoices = () => {
      axios.get('/api/management/customers/1/reveivables').then((response) => {
        if (mounted) {
          setReceivables(response.data.receivable);
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
                    <TableCell>Description</TableCell>
                    <TableCell>Transaction Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {receivables.map((recievable) => (
                    <TableRow key={recievable.id}>
                      <TableCell>
                        #
                        {recievable.id}
                      </TableCell>
                      <TableCell>
                        {recievable.date}
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
                        {recievable.amount}
                      </TableCell>
                      <TableCell>
                        $200

                      </TableCell>
                      <TableCell align="right">
                        <Button
                          color="primary"
                          component={RouterLink}
                          size="small"
                          to="/management/invoices/1"
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
    </div>
  );
}

Invoices.propTypes = {
  className: PropTypes.string,
};

export default Invoices;
