import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from '@material-ui/core';
import CategoriesTable from 'components/CategoriesTable';
import 'App.css';

class Home extends Component {
  render() {
    const { match, categories } = this.props;
    return (
      <Container maxWidth="lg">
        <CategoriesTable categories={categories} selectedCatId={match.params.id} />
      </Container>
    );
  }
}

Home.propTypes = {
  match: PropTypes.shape.isRequired,
  categories: PropTypes.shape.isRequired,
};
const mapStateToProps = state => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(Home);
