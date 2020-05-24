import React from 'react';
import clsx from 'clsx';
import { withStyles, createStyles } from '@material-ui/styles';
import {
    Modal,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    Divider,
    Button
} from '@material-ui/core';
import CartTable from './orderTable'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomerInfo from './customerInfo'
import _ from 'lodash'
import moment from 'moment';

const useStyles = createStyles((theme) => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        outline: 'none',
        boxShadow: theme.shadows[20],
        width: 1400,
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

class NewOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ordersList: [],
            columns: [
                { title: 'Description', field: 'description', editable: 'never' },
                { title: 'Barcode', field: 'barcode', editable: 'never' },
                { title: 'Discount', field: 'discount' },
                { title: 'Cost', field: 'finalCost', editable: 'never' },
                { title: 'Count', field: 'count', type: 'numeric' },
                { title: 'Total', field: 'total', editable: 'never' },
            ],
            newCustomer: {},
            chosenCustomer: {},
            paymentOption: 'Cash',
            dueDate: moment(new Date()).format('DD/MM/YYYY'),
            error: {
                error: false,
                errorMessage: ''
            },
        }
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.props.selectedCustomer && Object.keys(this.props.selectedCustomer).length) {
                this.setState({
                    chosenCustomer: this.props.selectedCustomer
                })
            }
        }, 0)
    }

    renderItemsSearch = () => {
        const productsSimpleArray = this.props.products.map(prod => `${prod.description} - ${prod.barcode}`);
        return (
            <Autocomplete
                id="search-products"
                options={productsSimpleArray}
                style={{ width: '60%', display: "inline-flex" }}
                onChange={(e, newValue) => this.itemSelected(newValue)}
                renderInput={(params) => (
                    <TextField style={{ width: '100%', display: "inline-flex" }} {...params} label="Search products" variant="outlined" />
                )}
            />
        )
    }

    itemSelected = (newValue) => {
        let newList = {};
        this.state.ordersList.forEach(item => {
            newList[item.id] = item
        })
        this.props.products.forEach(item => {
            const value = newValue && newValue.split('- ')[1];
            if (item.barcode === +value) {
                newList[item.id] = {
                    ...item,
                    count: 1,
                    total: `$${item.finalCost}`
                }
            }
        })
        this.setState({
            ordersList: Object.values(newList)
        })
    }

    onCustomerSelected = (value) => {
        if (value === 'New Customer') {
            this.setState({
                chosenCustomer: {},
                newCustomer: {}
            })
        } else {
            const customerId = value.split(' - ')[1]
            const customer = this.props.customers.find(item => item.id === +customerId)
            customer && this.setState({
                chosenCustomer: customer,
                newCustomer: {}
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            newCustomer: {
                ...this.state.newCustomer,
                [e.target.name]: e.target.value
            }
        })
    }

    paymentOptionChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    dueDateChanged = (event) => {
        this.setState({
            dueDate: event.toDate()
        })
    }

    renderCustomerInfo = () => {
        return <CustomerInfo dueDateChanged={this.dueDateChanged} dueDate={this.state.dueDate} handleChange={this.handleChange} selectedPaymentOption={this.state.paymentOption} paymentOptionChange={this.paymentOptionChange} onCustomerSelected={this.onCustomerSelected} customers={this.props.customers} newCustomer={this.state.newCustomer} chosenCustomer={this.state.chosenCustomer} />
    }

    deleteItem = (oldData) => new Promise((resolve) => {
        setTimeout(() => {
            resolve();
            this.setState((prevState) => {
                const data = [...prevState.ordersList];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, ordersList: data };
            });
        }, 600);
    })

    editItem = (newData, oldData) => new Promise((resolve) => {
        setTimeout(() => {
            resolve();
            if (oldData) {
                this.setState((prevState) => {
                    const data = [...prevState.ordersList];
                    const availableCount = this.props.products.find(item => item.id === newData.id).available
                    const availableCountIsLess = +newData.count > availableCount
                    const newCount = availableCountIsLess ? availableCount : +newData.count

                    data[data.indexOf(oldData)] = {
                        ...newData,
                        count: newCount,
                        total: `$${newCount * newData.finalCost}`
                    };
                    return {
                        ...prevState, ordersList: data, error: {
                            error: availableCountIsLess,
                            errorMessage: `There is only ${newCount} available for ${newData.description}, you don't have ${newData.count}`
                        }
                    };
                });
            }
        }, 600);
    });

    clearCart = () => {
        this.setState({
            ordersList: [],
            newCustomer: {},
            chosenCustomer: {},
            paymentOption: 'Cash',
            error: {
                errorMessage: '',
                error: false
            }
        })
    }

    handleConfirmClicked = () => {
        const customer = Object.keys(this.state.newCustomer).length ? this.state.newCustomer : this.state.chosenCustomer
        const cashierName = JSON.parse(sessionStorage.getItem('userInfo')).name
        this.props.hanldeOnConfirmClicked({ customer, cashierName, ordersList: this.state.ordersList, paymentOption: this.state.paymentOption, dueDate: this.state.dueDate })
        this.clearCart()
    }

    handleDismiss = () => {
        this.props.onClose()
        this.clearCart()
    }

    render() {
        const { classes } = this.props;
        const total = _.sum(this.state.ordersList.map(item => +item.total.replace('$', '')))
        const isCustomerChosen = this.state.chosenCustomer.name || this.state.newCustomer.name;
        const confirmButtonEnabled = isCustomerChosen && this.state.ordersList.length
        return (
            <Modal
                onClose={this.props.onClose}
                open={this.props.open}
            >
                <Card
                    className={clsx(classes.root)}
                >
                    <CardHeader title="Cart" />
                    <Divider />
                    <CardContent>
                        <div style={{ width: '60%', display: "inline-block", float: 'left' }}>

                            {this.renderItemsSearch()}
                            <Typography style={{ display: "inline-flex", float: 'right', color: "green" }} variant="h1">
                                ${Number(total).toLocaleString('en-us')}
                            </Typography>
                            <CartTable error={this.state.error} columns={this.state.columns} editItem={this.editItem} deleteItem={this.deleteItem} ordersList={this.state.ordersList} />
                        </div>
                        <div style={{ width: '40%', display: "inline-block", float: 'right' }}>
                            {this.renderCustomerInfo()}
                        </div>
                    </CardContent>
                    <Divider />
                    <CardActions className={classes.actions}>
                        <Button onClick={this.handleDismiss}>
                            Dismiss
                    </Button>
                        <Button
                            color="primary"
                            onClick={this.handleConfirmClicked}
                            variant="contained"
                            disabled={!confirmButtonEnabled}
                        >
                            Confirm
                    </Button>
                    </CardActions>
                </Card>
            </Modal>
        );
    }
}

export default withStyles(useStyles)(NewOrder);
