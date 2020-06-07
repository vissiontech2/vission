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

function OrderInfo({ purchase, className, ...rest }) {
  const classes = useStyles();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(_.sum(purchase.items.map((item) => +item.total)));
  }, [purchase]);

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
              <TableCell>Supplier</TableCell>
              <TableCell>
                <Link
                  component={RouterLink}
                  to={`/inventoryManagement/supplierDetails?id:${purchase.supplierId}`}
                >
                  {purchase.customerName}
                </Link>
                <div>{purchase.location}</div>
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>ID</TableCell>
              <TableCell>
                #
                {purchase.id}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ref</TableCell>
              <TableCell>{purchase.ref}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Date</TableCell>
              <TableCell>
                {purchase.date}
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Delivery Date</TableCell>
              <TableCell>
                {purchase.deliveryDate}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Shipment Description</TableCell>
              <TableCell>{purchase.shipment ? purchase.shipment : 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Discount</TableCell>
              <TableCell>{purchase.discount ? purchase.discount : 'N/A'}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Total</TableCell>
              <TableCell>
                {`${total}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>
                {purchase.method}
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
  purchase: PropTypes.object.isRequired,
};

export default OrderInfo;
