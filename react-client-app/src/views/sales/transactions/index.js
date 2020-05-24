import React from 'react';
import { withStyles, createStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import Page from 'src/components/Page';
import SearchBar from 'src/components/SearchBar';
import Header from './Header';
import Results from './Results';
import NewOrder from './newOrder/newOrder'
import { getAllOrders, getAllCustomers, getInventory, createOrder, editTransaction } from '../api';
import EditModal from './EditTransaction'

const useStyles = createStyles((theme) => ({
  root: {},
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

class Transactions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      filteredOrders: [],
      openNewOrder: false,
      customers: [],
      products: [],
      selectedCustomer: {},
      selectedOrder: {},
      editPopUp: false
    }
  }


  fetchOrders = async () => {
    await getAllOrders().then((response) => {
      this.setState({ orders: response.data.orders, filteredOrders: response.data.orders });
    });
    await getAllCustomers().then((response) => {
      // eslint-disable-next-line no-restricted-globals
      const id = location.search.replace('?customerId:', '')
      const selectedCustomer = response.data.customers.find(cus => cus.id === +id);
      this.setState({ customers: response.data.customers, selectedCustomer });
    });

    await getInventory().then((response) => {
      this.setState({ products: response.data.inventory.filter(product => product.available > 0) });
    });

  };

  async componentDidMount() {
    await this.fetchOrders();
    if (this.state.selectedCustomer && Object.keys(this.state.selectedCustomer).length) {
      this.handleNewOrder()
    }
  };

  handleNewOrder = () => {
    this.setState({ openNewOrder: true })
  }

  onClose = () => {
    this.setState({ openNewOrder: false, isEdit: false })
  }

  hanldeOnConfirmClicked = (orderInfo) => {
    createOrder(orderInfo).then((response) => {
      this.setState({ orders: response.data.orders, filteredOrders: response.data.orders });
    });
    this.onClose()
  }

  handleFilter = (e) => {
    const stringfiedArray = this.state.orders.map(order => JSON.stringify(order));
    const filteredData = stringfiedArray.filter(item => item.toLowerCase().search(e.target.value.toLowerCase()) !== -1)
    this.setState({
      filteredOrders: filteredData.map(item => JSON.parse(item))
    })
  }

  handleAddNote = (selectedOrder) => {
    this.setState({
      selectedOrder,
      editPopUp: true
    })
  }

  closeEditModal = () => {
    this.setState({
      selectedOrder: {},
      editPopUp: false
    })
  }

  onChange = (event) => {
    if (event.toDate) {
      this.setState({
        selectedOrder: {
          ...this.state.selectedOrder,
          dueDate: event.toDate().getTime()
        }
      })
    } else {
      this.setState({
        selectedOrder: {
          ...this.state.selectedOrder,
          [event.target.name]: event.target.value
        }
      })
    }
  }

  submitEdit = () => {
    const newNote = {
      ...this.state.selectedOrder,
      noteAddedBy: JSON.parse(sessionStorage.getItem('userInfo')).name
    }
    editTransaction(newNote).then(response => {
      this.setState({ orders: response.data.orders, filteredOrders: response.data.orders });
    })
    this.closeEditModal()
  }

  render() {
    const { classes } = this.props
    return (
      <Page
        className={classes.root}
        title="Orders Management List"
      >
        <Container
          maxWidth={false}
          className={classes.container}
        >
          <Header handleNewOrder={this.handleNewOrder} />
          <SearchBar
            handleFilter={this.handleFilter}
          />
          <Results
            className={classes.results}
            orders={this.state.filteredOrders}
            handleAddNote={this.handleAddNote}
          />
        </Container>
        <EditModal open={this.state.editPopUp} onClose={this.closeEditModal} transaction={this.state.selectedOrder} onSubmit={this.submitEdit} onChange={this.onChange} />
        <NewOrder selectedCustomer={this.state.selectedCustomer} products={this.state.products} open={this.state.openNewOrder} customers={this.state.customers} hanldeOnConfirmClicked={this.hanldeOnConfirmClicked} onClose={this.onClose} />
      </Page>
    );
  }
}

export default withStyles(useStyles)(Transactions);
