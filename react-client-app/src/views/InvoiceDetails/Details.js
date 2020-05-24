import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  colors,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: theme.spacing(6),
  },
  marginTop: {
    marginTop: theme.spacing(4),
  },
  dates: {
    padding: theme.spacing(2),
    backgroundColor: colors.grey[100],
  },
}));

function Details({ invoice, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <Grid
          container
          justify="space-between"
        >
          {/* <Grid item>
            <img
              alt="Brand"
              src="/images/logos/logo--dark.svg"
            />
          </Grid> */}
          <Grid item>
            <Typography
              align="right"
              component="h3"
              variant="h1"
            >
              PAID
            </Typography>
          </Grid>
        </Grid>
        <Grid
          alignItems="center"
          className={classes.marginTop}
          container
          justify="space-between"
        >
          <Grid item>
            <Typography variant="h5">Magaca shirkadda</Typography>
          </Grid>
          <Grid item>
            <Typography align="right">
              Invoice #
              {invoice.id.split('-').shift()}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          className={classes.marginTop}
          container
          justify="space-between"
        >
          <Grid item>
            <Typography>
              address ka shirkadda
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              Company No. 4675933
              {' '}
              <br />
              {/* EU VAT No. 949 67545 45 */}
              {' '}
              <br />
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="right">
              Email: info@vissionTek.com
              {' '}
              <br />
              Tel: 2247640656
            </Typography>
          </Grid>
        </Grid>
        <Grid
          className={clsx(classes.marginTop, classes.dates)}
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              component="h4"
              gutterBottom
              variant="overline"
            >
              Due date
            </Typography>
            <Typography>
              {moment(invoice.due_date).format('DD MMM YYYY')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              component="h4"
              gutterBottom
              variant="overline"
            >
              Date of issue
            </Typography>
            <Typography>
              {moment(invoice.issue_date).format('DD MMM YYYY')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              component="h4"
              gutterBottom
              variant="overline"
            >
              Reference
            </Typography>
            <Typography>{invoice.ref}</Typography>
          </Grid>
        </Grid>
        <div className={classes.marginTop}>
          <Typography
            component="h4"
            gutterBottom
            variant="overline"
          >
            Billed to
          </Typography>
          <Typography>
            {invoice.customer.name}
            {' '}
            <br />
            {invoice.customer.company}
            {' '}
            <br />
            {invoice.customer.nzbn}
            {' '}
            <br />
            {invoice.customer.address}
            {' '}
            <br />
          </Typography>
        </div>
        <Table className={classes.marginTop}>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell />
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.desc}</TableCell>
                <TableCell />
                <TableCell align="right">
                  {invoice.currency}
                  {product.value}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell />
              <TableCell>Subtotal</TableCell>
              <TableCell align="right">
                {invoice.currency}
                {invoice.subtotal}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell>Taxes</TableCell>
              <TableCell align="right">
                {invoice.currency}
                {invoice.taxes}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell>Total</TableCell>
              <TableCell align="right">
                {invoice.currency}
                {invoice.total}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className={classes.marginTop}>
          <Typography
            component="h4"
            gutterBottom
            variant="overline"
          >
            Notes
          </Typography>
          <Typography>
            Fadlan iska hubi inaad lacagtaan waqtigeeda ku bixisid. Waa muhiim in aysan kula dhaafin xiliga aan ku balannay
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

Details.propTypes = {
  className: PropTypes.string,
  invoice: PropTypes.object.isRequired,
};

export default Details;
