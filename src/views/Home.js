import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from '@material-ui/core';
import CategoriesTable from 'components/CategoriesTable';
import 'App.css';

import { fetchCategories as fetchCategoriesRedux } from 'references/redux/actions/categories';
import { fetchPosts as fetchPostsRedux } from 'references/redux/actions/posts';

class Home extends Component {
  state = {};

  componentDidMount() {
    const { fetchCategories, match, fetchPosts } = this.props;
    fetchCategories();
    if (match.params.id) {
      fetchPosts(match.params.id);
    }
  }

  render() {
    const {
      match,
      categories,
      selectedCatItems,
      fetchPosts,
    } = this.props;
    return (
      <Container maxWidth="lg">
        <CategoriesTable
          categories={categories}
          selectedCatId={match.params.id}
          selectedCatItems={selectedCatItems}
          fetchPosts={fetchPosts}
        />
      </Container>
    );
  }
}

Home.propTypes = {
  match: PropTypes.shape.isRequired,
  categories: PropTypes.shape.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  selectedCatItems: PropTypes.shape.isRequired,
};

const mapStateToProps = state => ({
  selectedCatItems: state.posts,
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategoriesRedux()),
  fetchPosts: id => dispatch(fetchPostsRedux(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
