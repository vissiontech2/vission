import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  colors,
} from '@material-ui/core';
import Label from 'src/components/Label';
import GenericMoreButton from 'src/components/GenericMoreButton';
import TableEditBar from 'src/components/TableEditBar';
import MessageIcon from '@material-ui/icons/Message';
import currencyFormatter from '../../../utils/currencyFormatter';

const useStyles = makeStyles((theme) => ({
  root: {},
  filterButton: {
    marginRight: theme.spacing(2),
  },
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1150,
  },
  actions: {
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end',
  },
}));

const paymentStatusColors = {
  canceled: colors.grey[600],
  Receivable: colors.orange[600],
  Cash: colors.green[600],
  rejected: colors.red[600],
};

function Results({
  className, orders, handleAddNote, ...rest
}) {
  const classes = useStyles();
  const [selectedOrders] = useState([]);

  const rowColorer = (dueDate) => '#ff5e0059';

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography
        color="textSecondary"
        gutterBottom
        variant="body2"
      />
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="Transactions"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ref</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Method</TableCell>
                    <TableCell>Cashier</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Note</TableCell>
                    <TableCell>Note Exists</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow
                      key={order.id}
                      style={{ backgroundColor: rowColorer(order.dueDate) }}
                      selected={selectedOrders.indexOf(order.id) !== -1}
                    >
                      <TableCell>
                        {order.ref}
                      </TableCell>
                      <TableCell>
                        {moment(order.date).format(
                          'DD MMM YYYY',
                        )}
                      </TableCell>
                      <TableCell>
                        {moment(order.dueDate).format(
                          'DD MMM YYYY',
                        )}
                      </TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>
                        <Label
                          color={paymentStatusColors[order.method]}
                          variant="outlined"
                        >
                          {order.method}
                        </Label>
                      </TableCell>
                      <TableCell>{order.cashier}</TableCell>
                      <TableCell>
                        {currencyFormatter(order.total)}
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleAddNote(order)}>
                          <MessageIcon />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div>
                          {order.noteAddedBy}
                        </div>
                        {!!order.note && moment(order.noteDate).format(
                          'DD MMM YYYY',
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          color="primary"
                          component={RouterLink}
                          size="small"
                          to={`/sales/transactionDetails?id:${order.id}`}
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
      <TableEditBar selected={selectedOrders} />
    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  orders: PropTypes.array,
};

Results.defaultProps = {
  orders: [],
};

export default Results;
