import React from 'react';
import { withStyles, createStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import Page from 'src/components/Page';
import SearchBar from 'src/components/SearchBar';
import Header from './Header';
import Results from './Results';
import NewPurchase from './newPurchase'
import { getAllPurchases, getAllSuppliers, getInventory, createPurchase } from '../api';

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
      purchases: [],
      filteredPurchases: [],
      openNewPurchase: false,
      suppliers: [],
      products: [],
      selectedSupplier: {}

      // purchases: [],
      // filteredpurchases: [],
      // openNewPurchase: false,
      // suppliers: [],
      // products: [],
      // selectedCustomer: {}
    }
  }


  fetchpurchases = async () => {
    await getAllPurchases().then((response) => {
      this.setState({ purchases: response.data.purchases, filteredPurchases: response.data.purchases });
    });
    await getAllSuppliers().then((response) => {
      // eslint-disable-next-line no-restricted-globals
      const id = location.search.replace('?supplierId:', '')
      const selectedSupplier = response.data.suppliers.find(sup => sup.id === +id);
      this.setState({ suppliers: response.data.suppliers, selectedSupplier });
    });

    await getInventory().then((response) => {
      this.setState({ products: response.data.inventory.filter(product => product.available > 0) });
    });

  };

  async componentDidMount() {
    await this.fetchpurchases();
    if (this.state.selectedSupplier && Object.keys(this.state.selectedSupplier).length) {
      this.handleNewOrder()
    }
  };

  handleNewOrder = () => {
    this.setState({ openNewPurchase: true })
  }

  onClose = () => {
    this.setState({ openNewPurchase: false })
  }

  hanldeOnConfirmClicked = (purchaseInfo) => {
    console.log('new purchase created', purchaseInfo)

    createPurchase(purchaseInfo).then((response) => {
      this.setState({ purchases: response.data.purchases, filteredPurchases: response.data.purchases });
    });
    this.onClose()
  }

  handleFilter = (e) => {
    const stringfiedArray = this.state.purchases.map(order => JSON.stringify(order));
    const filteredData = stringfiedArray.filter(item => item.toLowerCase().search(e.target.value.toLowerCase()) !== -1)
    this.setState({
      filteredPurchases: filteredData.map(item => JSON.parse(item))
    })
  }

  render() {
    const { classes } = this.props
    return (
      <Page
        className={classes.root}
        title="purchases Management List"
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
            purchases={this.state.filteredPurchases}
          />
        </Container>
        <NewPurchase selectedSupplier={this.state.selectedSupplier} products={this.state.products} open={this.state.openNewPurchase} suppliers={this.state.suppliers} hanldeOnConfirmClicked={this.hanldeOnConfirmClicked} onClose={this.onClose} />
      </Page>
    );
  }
}

export default withStyles(useStyles)(Transactions);
