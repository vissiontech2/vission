import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  // Avatar,
  Card,
  CardContent,
  CardHeader,
  // Checkbox,
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
// import getInitials from 'src/utils/getInitials';
import GenericMoreButton from 'src/components/GenericMoreButton';
// import TableEditBar from 'src/components/TableEditBar';
import currencyFormatter from '../../../utils/currencyFormatter';

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

function Results({ className, suppliers, ...rest }) {
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
                    <TableCell>Email</TableCell>
                    <TableCell>Primary Contact</TableCell>
                    <TableCell>Completed purchases</TableCell>
                    <TableCell>Invoices</TableCell>
                    <TableCell>payable</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {suppliers.map((supplier) => (
                    <TableRow
                      hover
                      key={supplier.id}
                    // selected={selectedCustomers.indexOf(customer.id) !== -1}
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
                          <div>
                            <Link
                              color="inherit"
                              component={RouterLink}
                              to={`/inventoryManagement/supplierDetails?id:${supplier.id}`}
                              variant="h6"
                            >
                              {supplier.name}
                            </Link>
                            {/* <div>{suppliers.email}</div> */}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{supplier.location}</TableCell>
                      <TableCell>{supplier.primaryContact}</TableCell>
                      <TableCell>{supplier.email}</TableCell>
                      <TableCell>
                        {currencyFormatter(supplier.invoice.fullfilled)}
                      </TableCell>
                      {/* <TableCell>{customer.creditEligible}</TableCell> */}
                      <TableCell>{supplier.invoices}</TableCell>
                      <TableCell>{currencyFormatter(supplier.invoice.payable)}</TableCell>
                      <TableCell align="right">
                        <Button
                          color="primary"
                          component={RouterLink}
                          size="small"
                          to={`/inventoryManagement/orders?supplierId:${supplier.id}`}
                          variant="outlined"
                        >
                          New Purchase
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
      {/* <TableEditBar selected={selectedCustomers} /> */}
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
