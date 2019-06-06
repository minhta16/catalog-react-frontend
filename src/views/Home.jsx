import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container } from '@material-ui/core';
import CategoriesTable from 'components/CategoriesTable';
import 'App.css';

class Home extends Component {
  componentDidMount() {
    return 0;
  }

  render() {
    return (
      <Container maxWidth="lg">
        <CategoriesTable />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(Home);
