import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';

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

function Results({ className, products, ...rest }) {
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
          title="Inventory"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Available</TableCell>
                    <TableCell>SupplierC</TableCell>
                    <TableCell>Earning</TableCell>
                    <TableCell>SellingPrice</TableCell>
                    <TableCell>lastOrdered</TableCell>
                    <TableCell>Expired</TableCell>
                    <TableCell>Operator</TableCell>
                    {/* <TableCell align="right">Actions</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow
                      hover
                      key={product.id}
                    >
                      <TableCell>
                        <div className={classes.nameCell}>
                          <div>
                            {product.description}
                            <div>{product.barcode}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.available}</TableCell>
                      <TableCell>
                        {product.supplierCost}
                      </TableCell>
                      <TableCell>{product.earning}</TableCell>
                      <TableCell>{product.finalCost}</TableCell>
                      <TableCell>{product.lastUpdated}</TableCell>
                      <TableCell>{product.expired}</TableCell>
                      <TableCell>{product.operatorId}</TableCell>
                      {/* <TableCell align="right">
                                                <Button
                                                    color="primary"
                                                    size="small"
                                                    variant="outlined"
                                                >
                                                    Edit
                                                </Button>
                                            </TableCell> */}
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

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array,
};

Results.defaultProps = {
  customers: [],
};

export default Results;
