import React, { useState } from 'react';
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
  open, onSubmit, onClose, title, supplier, className, ...rest
}) {
  const classes = useStyles();
  const [values, setValues] = useState({
    ...supplier,
  });

  const handleFieldChange = (event) => {
    event.persist();
    setValues((currentValues) => ({
      ...currentValues,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    }));
  };

  if (!open) {
    return null;
  }

  const handleSubmit = () => {
    onSubmit(values);
  };

  return (
    <Modal
      onClose={onClose}
      open={open}
    >
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <form>
          <CardHeader title={title} />
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
                  label="Email address"
                  name="email"
                  onChange={handleFieldChange}
                  value={values.email}
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
                  label="Name"
                  name="name"
                  onChange={handleFieldChange}
                  value={values.name}
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
                  label="Phone number"
                  name="phone"
                  onChange={handleFieldChange}
                  value={values.phone}
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
                  label="Location"
                  name="location"
                  onChange={handleFieldChange}
                  value={values.location}
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
                  label="Primary Contact"
                  name="primaryContact"
                  onChange={handleFieldChange}
                  value={values.primaryContact}
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
              onClick={handleSubmit}
              variant="contained"
            >
              Save
            </Button>
          </CardActions>
        </form>
      </Card>
    </Modal>
  );
}

CustomerEditModal.propTypes = {
  className: PropTypes.string,
  supplier: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

CustomerEditModal.defaultProps = {
  open: false,
  onClose: () => { },
};

export default CustomerEditModal;
