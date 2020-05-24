import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Divider,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Link,
} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import _ from 'lodash';
import currencyFormatter from '../../../utils/currencyFormatter';

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

function OrderInfo({ order, className, ...rest }) {
  const classes = useStyles();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(_.sum(order.items.map((item) => +item.total)));
  }, [order]);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Order info" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>
                <Link
                  component={RouterLink}
                  to={`/sales/customerDetails?id:${order.customerId}`}
                >
                  {order.customerName}
                </Link>
                <div>{order.location}</div>
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>ID</TableCell>
              <TableCell>
                #
                {order.id}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ref</TableCell>
              <TableCell>{order.ref}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Date</TableCell>
              <TableCell>
                {order.date}
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Due Date</TableCell>
              <TableCell>
                {order.paymentDate}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Shipment Description</TableCell>
              <TableCell>{order.shipment ? order.shipment : 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Discount</TableCell>
              <TableCell>{order.discount ? order.discount : 'N/A'}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Total</TableCell>
              <TableCell>
                {currencyFormatter(total)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>
                {order.method}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button>
          <ReceiptIcon className={classes.buttonIcon} />
          Resend invoice
        </Button>
      </CardActions>
    </Card>
  );
}

OrderInfo.propTypes = {
  className: PropTypes.string,
  order: PropTypes.object.isRequired,
};

export default OrderInfo;
