import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from '@material-ui/core';
import CategoriesTable from 'components/CategoriesTable';
import 'App.css';

import { fetchCategories as fetchCategoriesRedux } from 'references/redux/actions/categories';
import { fetchPosts as fetchPostsRedux } from 'references/redux/actions/posts';
import { selectAllPosts } from 'references/redux/selectors/posts';
import { selectCategories, selectCategory } from 'references/redux/selectors/categories';

export class Home extends Component {
  componentDidMount() {
    const { fetchCategories, match, fetchPosts } = this.props;
    fetchCategories();
    if (match.params.id) {
      fetchPosts(match.params.id);
    }
  }

  render() {
    const { match, categories, selectedCatItems, fetchPosts, selectedCategory } = this.props;
    return (
      <Container maxWidth="lg">
        <CategoriesTable
          categories={categories}
          selectedCatId={match.params.id}
          selectedCat={selectedCategory}
          selectedCatItems={selectedCatItems}
          fetchPosts={fetchPosts}
        />
      </Container>
    );
  }
}

Home.propTypes = {
  match: PropTypes.object,
  categories: PropTypes.array,
  fetchCategories: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  selectedCatItems: PropTypes.array,
  selectedCategory: PropTypes.object,
};

Home.defaultProps = {
  match: {},
  categories: {},
  selectedCatItems: {},
  selectedCategory: {},
};

const mapSelectorToProps = (state, ownProps) => ({
  selectedCatItems: selectAllPosts(state),
  categories: selectCategories(state),
  selectedCategory: selectCategory(state, ownProps.match.params.id),
});

const mapDispatchToProps = {
  fetchCategories: fetchCategoriesRedux,
  fetchPosts: fetchPostsRedux,
};

export default connect(
  mapSelectorToProps,
  mapDispatchToProps,
)(Home);
