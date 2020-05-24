import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > * + *': {
      marginLeft: 0,
    },
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
  },
}));

// const getSum = (invoices, type) => {
//   const filtered = invoices.filter(invoice => invoice.type === type);
//   const total = filtered
//     .reduce((total, invoice) => total + invoice.value, 0)
//     .toFixed(2);

//   return [filtered, total];
// };

function Invoices({ invoice, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Invoices/Billing" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow selected>
              <TableCell>Total Purchase</TableCell>
              <TableCell>
                {invoice.totalPurchase}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Paid</TableCell>
              <TableCell>
                {invoice.paid}
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Unpaid/Due</TableCell>
              <TableCell>
                {invoice.unpaid}

              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Refunded</TableCell>
              <TableCell>
                {invoice.refunded}

              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

Invoices.propTypes = {
  className: PropTypes.string,
  invoice: PropTypes.object.isRequired,
};

export default Invoices;
