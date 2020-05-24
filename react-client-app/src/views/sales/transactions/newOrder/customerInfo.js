import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    Link,
    CardContent,
    TextField
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles, createStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = createStyles((theme) => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        outline: 'none',
        boxShadow: theme.shadows[20],
        width: 1300,
        maxHeight: '100%',
        overflowY: 'auto',
        maxWidth: '100%'
    },
    container: {
        marginTop: theme.spacing(3),
        height: 200
    },
    actions: {
        justifyContent: 'flex-end'
    }
}));

class CustomerInfo extends Component {


    renderCustomerSearch = () => {
        let customersSimpleArray = this.props.customers.map(customer => `${customer.name} - ${customer.id}`);
        customersSimpleArray.unshift('New Customer')
        return (
            <Autocomplete
                id="search-customer"
                options={customersSimpleArray}
                style={{ width: '100%', display: "inline-flex", marginTop: 10 }}
                onChange={(e, newValue) => this.props.onCustomerSelected(newValue)}
                renderInput={(params) => (
                    <TextField style={{ width: '100%', display: "inline-flex" }} {...params} label="Search customers" variant="outlined" />
                )}
            />
        )
    }
    render() {
        const { classes } = this.props
        const paymentOptions = ['Cash', 'Receivable']
        return (
            <CardContent className={classes.content}>
                {this.renderCustomerSearch()}
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Customer</TableCell>
                            <TableCell>
                                {this.props.chosenCustomer.name ? <Link
                                    component={RouterLink}
                                    to={`/sales/customerDetails?id:${this.props.chosenCustomer.id}`}
                                >
                                    {this.props.chosenCustomer.name} </Link> : <TextField name="name" onChange={this.props.handleChange} />}
                            </TableCell>
                        </TableRow>
                        <TableRow selected>
                            <TableCell>ID</TableCell>
                            <TableCell>
                                {this.props.chosenCustomer.id || 'N/A'}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Shipment Description</TableCell>
                            <TableCell>
                                {this.props.chosenCustomer.shipment || <TextField name="shipment" onChange={this.props.handleChange} />}

                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Location</TableCell>
                            <TableCell>
                                {this.props.chosenCustomer.location || <TextField name="location" onChange={this.props.handleChange} />}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Payment</TableCell>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    name="paymentOption"
                                    onChange={this.props.paymentOptionChange}
                                    select
                                    // eslint-disable-next-line react/jsx-sort-props
                                    SelectProps={{ native: true }}
                                    value={this.props.selectedPaymentOption}
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
                        {this.props.selectedPaymentOption === 'Receivable' && <TableRow>
                            <TableCell>Due Date</TableCell>
                            <TableCell>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="DD/MM/YYYY"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date picker inline"
                                    value={this.props.dueDate}
                                    onChange={this.props.dueDateChanged}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </CardContent>
        )
    }
}

export default withStyles(useStyles)(CustomerInfo);