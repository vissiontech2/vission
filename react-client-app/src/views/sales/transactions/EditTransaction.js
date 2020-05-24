import React from 'react';
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
    TextareaAutosize,
} from '@material-ui/core';

import {
    KeyboardDatePicker,
} from '@material-ui/pickers';

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

function NoteOrEdit({
    open, onClose, transaction = {}, onSubmit, onChange, className, ...rest
}) {
    const classes = useStyles();

    if (!open) {
        return null;
    }

    const renderEditModal = () => (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <form>
                <CardHeader title={`#${transaction.id}`} />
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
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="DD/MM/YYYY"
                                margin="normal"
                                id="date-picker-inline"
                                label="Due Date"
                                value={transaction.dueDate}
                                onChange={onChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                name="method"
                                onChange={onChange}
                                select
                                // eslint-disable-next-line react/jsx-sort-props
                                SelectProps={{ native: true }}
                                value={transaction.method}
                                variant="outlined"
                            >
                                {['Cash', 'Receivable'].map((option) => (
                                    <option
                                        key={option}
                                        value={option}
                                    >
                                        {option}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <TextareaAutosize
                                label="Note"
                                name="note"
                                onChange={onChange}
                                style={{ width: '100%', minHeight: 150, fontSize: 20 }}
                                value={transaction.note}
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
                        onClick={onSubmit}
                        variant="contained"
                    >
                        Submit
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
            {renderEditModal()}
        </Modal>
    );
}

export default NoteOrEdit;
