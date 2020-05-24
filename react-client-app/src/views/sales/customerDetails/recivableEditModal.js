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
  Grid,
  Divider,
  TextField,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%',
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

function CustomerEditModal({
  open, onClose, handlePaymentSubmit, handleEditSubmit, paymentInfo, handlePaymentChange, handleEditReveivable, receivable, payment, submitEdited, className, ...rest
}) {
  const classes = useStyles();

  if (!open) {
    return null;
  }

  const renderPaymentContent = () => (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader title="Payment" />
        <Divider />
        <CardContent
          style={{ backgroundColor: '#00800026' }}
        >
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Description"
                name="paymentDescription"
                onChange={handlePaymentChange}
                // value={paymentInfo.paymentDescription}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Amount"
                name="paymentAmount"
                onChange={handlePaymentChange}
                // value={paymentInfo.paymentAmount}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button onClick={onClose}>
            Dismiss
          </Button>
          <Button
            color="primary"
            onClick={handlePaymentSubmit}
            variant="contained"
          >
            Pay
          </Button>
        </CardActions>
      </form>
    </Card>
  );

  const renderEditContent = () => (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader title="Edit Receivable" />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Description"
                name="description"
                onChange={handleEditReveivable}
                value={receivable.description}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Amount"
                name="amount"
                onChange={handleEditReveivable}
                value={receivable.amount}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button onClick={onClose}>
            Close
          </Button>
          <Button
            color="primary"
            onClick={handleEditSubmit}
            variant="contained"
          >
            Save
          </Button>
        </CardActions>
      </form>
    </Card>
  );

  return (
    <Modal
      onClose={onClose}
      open={open}
    >
      {!payment ? renderEditContent() : renderPaymentContent()}
    </Modal>
  );
}

CustomerEditModal.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

CustomerEditModal.defaultProps = {
  open: false,
  onClose: () => { },
};

export default CustomerEditModal;
