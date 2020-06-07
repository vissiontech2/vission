import React from 'react';
import { createStyles, withStyles } from '@material-ui/styles';
import Page from 'src/components/Page';
import SearchBar from 'src/components/SearchBar';
import { Container } from '@material-ui/core';
import Header from './header';
import Results from './Results';
import { getInventory } from '../api';


const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  results: {
    marginTop: theme.spacing(3),
  },
}));

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    const response = await getInventory();
    this.setState({
      data: response.data.inventory,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Page
        className={classes.root}
        title="Customer Management List"
      >
        <Container maxWidth={false}>
          <Header handleNewOpen={() => { }} />
          <SearchBar
            onFilter={() => { }}
            onSearch={() => { }}
            handleFilter={() => { }}
          />
          {this.state.data && (
          <Results
            className={classes.results}
            products={this.state.data}
          />
          )}
        </Container>
      </Page>
    );
  }
}

export default withStyles(useStyles)(Inventory);
