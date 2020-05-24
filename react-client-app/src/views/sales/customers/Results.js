import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import GenericMoreButton from 'src/components/GenericMoreButton';
import TableEditBar from 'src/components/TableEditBar';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 700,
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end',
  },
}));

function Results({ className, customers, ...rest }) {
  const classes = useStyles();
  const [selectedCustomers] = useState([]);


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
          title="All customers"
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
                        checked={selectedCustomers.length === customers.length}
                        color="primary"
                        indeterminate={
                          selectedCustomers.length > 0
                          && selectedCustomers.length < customers.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell> */}
                    <TableCell>Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Money spent</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Invoices</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow
                      hover
                      key={customer.id}
                      selected={selectedCustomers.indexOf(customer.id) !== -1}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={
                            selectedCustomers.indexOf(customer.id) !== -1
                          }
                          color="primary"
                          onChange={(event) => handleSelectOne(event, customer.id)}
                          value={selectedCustomers.indexOf(customer.id) !== -1}
                        />
                      </TableCell> */}
                      <TableCell>
                        <div className={classes.nameCell}>
                          <Avatar
                            className={classes.avatar}
                            src={customer.avatar}
                          >
                            {getInitials(customer.name)}
                          </Avatar>
                          <div>
                            <Link
                              color="inherit"
                              component={RouterLink}
                              to={`/sales/customerDetails?id:${customer.id}`}
                              variant="h6"
                            >
                              {customer.name}
                            </Link>
                            <div>{customer.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{customer.location}</TableCell>
                      <TableCell>
                        {customer.invoice.totalPurchase}
                      </TableCell>
                      <TableCell>{customer.creditEligible}</TableCell>
                      <TableCell>{customer.invoices}</TableCell>
                      <TableCell>{customer.invoice.unpaid}</TableCell>
                      <TableCell align="right">
                        <Button
                          color="primary"
                          component={RouterLink}
                          size="small"
                          to={`/sales/transactions?customerId:${customer.id}`}
                          variant="outlined"
                        >
                          New order
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
            count={customers.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions> */}
      </Card>
      <TableEditBar selected={selectedCustomers} />
    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array,
};

Results.defaultProps = {
  customers: [],
};

export default Results;
