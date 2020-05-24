import React from 'react';
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
// import TableEditBar from 'src/components/TableEditBar';
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

function Results({ className, purchases, ...rest }) {
  const classes = useStyles();
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
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedOrders.length === purchases.length}
                        color="primary"
                        indeterminate={
                          selectedOrders.length > 0
                          && selectedOrders.length < purchases.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell> */}
                    <TableCell>Ref</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Delivery Date</TableCell>
                    <TableCell>Supplier</TableCell>
                    <TableCell>Method</TableCell>
                    <TableCell>Cashier</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchases.map((purchase) => (
                    <TableRow
                      key={purchase.id}
                    // selected={selectedOrders.indexOf(order.id) !== -1}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedOrders.indexOf(order.id) !== -1}
                          color="primary"
                          onChange={(event) => handleSelectOne(event, order.id)}
                          value={selectedOrders.indexOf(order.id) !== -1}
                        />
                      </TableCell> */}
                      <TableCell>
                        {purchase.ref}
                      </TableCell>
                      <TableCell>
                        {moment(purchase.date).format(
                          'DD MMM YYYY',
                        )}
                      </TableCell>
                      <TableCell>
                        {moment(purchase.deliveryDate).format(
                          'DD MMM YYYY',
                        )}
                      </TableCell>
                      <TableCell>{purchase.supplierId}</TableCell>
                      <TableCell>
                        <Label
                          color={paymentStatusColors[purchase.method]}
                          variant="outlined"
                        >
                          {purchase.method}
                        </Label>
                      </TableCell>
                      <TableCell>{purchase.cashier}</TableCell>
                      <TableCell>
                        {currencyFormatter(purchase.total)}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          color="primary"
                          component={RouterLink}
                          size="small"
                          to={`/purchases/orderDetails?id:${purchase.id}`}
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
        {/* <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={purchases.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions> */}
      </Card>
      {/* <TableEditBar selected={selectedOrders} /> */}
    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  purchases: PropTypes.array,
};

Results.defaultProps = {
  purchases: [],
};

export default Results;
