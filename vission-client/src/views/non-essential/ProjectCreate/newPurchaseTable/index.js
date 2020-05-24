import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Divider,
  Button,
,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Link
} from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CartTable from './orderTable'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 1000,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%',
  },
  container: {
    marginTop: theme.spacing(3),
    height: 200,
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

function BaseModal() {
  const classes = useStyles();
  const [isNewSupplier, setIsNewSupplier] = React.useState(true);
  const [selectedSupplier, setSelectedSupplier] = React.useState({});


  const renderItemsSearch = () => {
    const products = ['Water', 'Barris'];

    return (
          <Autocomplete
              id="search-products"
              options={products}
              style={{ width: '60%', display: 'inline-flex' }}
              renderInput={(params) => (
                  <TextField style={{ width: '100%', display: 'inline-flex' }} {...params} label="Search products" variant="outlined" />
                )}
            />
    );
  };

  const renderCustomers = () => {
    const customers = ['Geedi', 'Faarah'];

    return (
          <Autocomplete
              id="search-customer"
              options={customers}
                // getOptionDisabled={(option) => option === products[0] || option === products[2]}
              style={{ width: '100%', display: 'inline-flex', marginTop: 10 }}
              renderInput={(params) => (
                  <TextField style={{ width: '100%', display: 'inline-flex' }} {...params} label="Search customers" variant="outlined" />
                )}
            />
    );
  };

  const handleChange = () => {

  };

  const renderCustomerInfo = () => {
    const paymentOptions = ['Payable', 'Cash'];
    return (
          <CardContent className={classes.content}>
              {renderCustomers()}
              <Table>
                  <TableBody>
                      <TableRow>
                          <TableCell>Supplier</TableCell>
                          <TableCell>
                              {isNewSupplier ? <TextField id="standard-basic" label="Standard" />
                                    : <Link
                                      component={RouterLink}
                                      to={`/management/customers/${selectedSupplier.id}`}
                                    >
                                      Halgan Group
                                </Link>}
                            </TableCell>
                        </TableRow>
                      <TableRow selected>
                          <TableCell>ID</TableCell>
                          <TableCell>
                              <TableCell>
                                  {isNewSupplier ? 'N/A' : selectedSupplier.location}
                                </TableCell>
                            </TableCell>
                        </TableRow>
                      <TableRow>
                          <TableCell>Location</TableCell>
                          <TableCell>
                              {isNewSupplier ? <TextField id="standard-basic" label="Standard" /> : selectedSupplier.location}
                            </TableCell>
                        </TableRow>
                      <TableRow>
                          <TableCell>Contact Person</TableCell>
                          <TableCell>
                              {isNewSupplier ? <TextField id="standard-basic" label="Standard" /> : selectedSupplier.contactPerson}
                            </TableCell>
                        </TableRow>
                      <TableRow selected>
                          <TableCell>Phone #</TableCell>
                          <TableCell>
                              {isNewSupplier ? <TextField id="standard-basic" label="Standard" /> : selectedSupplier.phone}
                            </TableCell>
                        </TableRow>
                      <TableRow>
                          <TableCell>Payment</TableCell>
                          <TableCell>
                              <TextField
                                  fullWidth
                                  name="option"
                                  onChange={handleChange}
                                  select
                                    // eslint-disable-next-line react/jsx-sort-props
                                  SelectProps={{ native: true }}
                                  value=""
                                  variant="outlined"
                                >
                                  {paymentOptions.map((option) => (
                                      <option
                                          key={option}
                                          value={option}
                                        >
                                          {option}
                                        </option>
                                    ))}
                                </TextField>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
    );
  };
  return (
      <Card>
          <CardHeader title="Cart" />
          <Divider />
          <CardContent>
              <div style={{ width: '60%', display: 'inline-block', float: 'left' }}>
                  {renderItemsSearch()}
                  <Typography style={{ display: 'inline-flex', float: 'right', color: 'green' }} variant="h1">
                      ${Number(59888889).toLocaleString('en-us')}
                    </Typography>
                  <CartTable />
                </div>
              <div style={{ width: '40%', display: 'inline-block', float: 'right' }}>
                  {renderCustomerInfo()}
                </div>
            </CardContent>
          <Divider />
        </Card>
  );
}

BaseModal.propTypes = {
  className: PropTypes.string,
};

BaseModal.defaultProps = {
  open: false,
  onClose: () => { },
};

export default BaseModal;
