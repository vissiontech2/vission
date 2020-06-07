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
import CartTable from './purchaseTable'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SupplierInfo from './supplierInfo'
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
                { title: 'Description', field: 'description' },
                // { title: 'Barcode', field: 'barcode', editable: 'never' },
                // { title: 'Discount', field: 'discount' },
                { title: 'Cost', field: 'finalCost' },
                { title: 'Count', field: 'count' },
                { title: 'Total', field: 'total', editable: 'never' },
            ],
            newSupplier: {},
            chosenSupplier: {},
            paymentOption: 'Cash',
            deliveryDate: moment(new Date()).format('DD/MM/YYYY'),
            error: {
                error: false,
                errorMessage: ''
            },
        }
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.props.selectedSupplier && Object.keys(this.props.selectedSupplier).length) {
                this.setState({
                    chosenSupplier: this.props.selectedSupplier
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
                    <TextField
                        onChange={this.itemSelected}
                        style={{ width: '100%', display: "inline-flex" }} {...params} label="Search products" variant="outlined" />
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
        if (value === 'New Supplier') {
            this.setState({
                chosenSupplier: {},
                newSupplier: {}
            })
        } else {
            const supplierId = value.split(' - ')[1]
            const supplier = this.props.suppliers.find(item => item.id === +supplierId)
            supplier && this.setState({
                chosenSupplier: supplier,
                newSupplier: {}
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            newSupplier: {
                ...this.state.newSupplier,
                [e.target.name]: e.target.value
            }
        })
    }

    paymentOptionChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    deliveryDateChanged = (event) => {
        this.setState({
            deliveryDate: event.toDate()
        })
    }

    renderCustomerInfo = () => {
        return <SupplierInfo deliveryDateChanged={this.deliveryDateChanged} deliveryDate={this.state.deliveryDate} handleChange={this.handleChange} selectedPaymentOption={this.state.paymentOption} paymentOptionChange={this.paymentOptionChange} onCustomerSelected={this.onCustomerSelected} suppliers={this.props.suppliers} newSupplier={this.state.newSupplier} chosenSupplier={this.state.chosenSupplier} />
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

    onRowAdd = (newData) => new Promise((resolve) => {
        setTimeout(() => {
            resolve();
            if (newData) {
                this.setState((prevState) => {
                    const data = [...prevState.ordersList];
                    data.push({
                        ...newData,
                        total: `$${+newData.finalCost * +newData.count}`
                    })
                    return {
                        ...prevState, ordersList: data
                    };
                });
            }
        }, 600);
    });

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
            newSupplier: {},
            chosenSupplier: {},
            paymentOption: 'Cash',
            error: {
                errorMessage: '',
                error: false
            }
        })
    }

    handleConfirmClicked = () => {
        const supplier = Object.keys(this.state.newSupplier).length ? this.state.newSupplier : this.state.chosenSupplier
        this.props.hanldeOnConfirmClicked({ supplier, ordersList: this.state.ordersList, paymentOption: this.state.paymentOption, deliveryDate: this.state.deliveryDate })
        this.clearCart()
    }

    handleDismiss = () => {
        this.props.onClose()
        this.clearCart()
    }

    render() {
        const { classes } = this.props;
        const total = _.sum(this.state.ordersList.map(item => +item.total.replace('$', '')))
        const isCustomerChosen = this.state.chosenSupplier.name || this.state.newSupplier.name;
        const confirmButtonEnabled = isCustomerChosen && this.state.ordersList.length
        return (
            <Modal
                onClose={this.props.onClose}
                open={this.props.open}
            >
                <Card
                    className={clsx(classes.root)}
                >
                    <CardHeader title="New Purchase Order" />
                    <Divider />
                    <CardContent>
                        <div style={{ width: '60%', display: "inline-block", float: 'left' }}>

                            {this.renderItemsSearch()}
                            <Typography style={{ display: "inline-flex", float: 'right', color: "green" }} variant="h1">
                                ${Number(total).toLocaleString('en-us')}
                            </Typography>
                            <CartTable error={this.state.error} columns={this.state.columns} editItem={this.editItem} deleteItem={this.deleteItem} ordersList={this.state.ordersList} onRowAdd={this.onRowAdd} />
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
