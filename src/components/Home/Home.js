import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from '@material-ui/core';
import CategoriesTable from 'components/Home/CategoriesTable';
import { fetchPosts as fetchPostsRedux } from 'actions/posts';
import { selectAllPosts, selectPostLoading } from 'selectors/posts';
import { selectCategories, selectCategory, selectCategoriesLoading } from 'selectors/categories';
import { openSnackbar as openSnackbarRedux } from 'actions/misc';

export class Home extends Component {
  /**
   * always fetchCategories upon mount. if the user is viewing a category then fetch the posts in that category. If there is a snackbarMessage then open the snackbar
   */
  componentDidMount() {
    const { match, fetchPosts, location, openSnackbar } = this.props;
    if (match.params.id) {
      fetchPosts(match.params.id);
    }
    if (location.snackbarMess) {
      openSnackbar(location.snackbarMess);
    }
  }

  render() {
    const {
      match,
      categories,
      selectedCatItems,
      fetchPosts,
      selectedCategory,
      categoriesLoading,
      postsLoading,
    } = this.props;
    // Render a categories table and a snackbar to be displayed when needed
    return (
      <Container maxWidth="lg">
        <CategoriesTable
          categories={categories}
          selectedCatId={match.params.id}
          selectedCat={selectedCategory}
          selectedCatItems={selectedCatItems}
          fetchPosts={fetchPosts}
          categoriesLoading={categoriesLoading}
          postsLoading={postsLoading}
        />
      </Container>
    );
  }
}

Home.propTypes = {
  match: PropTypes.object,
  categories: PropTypes.array,
  fetchPosts: PropTypes.func.isRequired,
  selectedCatItems: PropTypes.array,
  selectedCategory: PropTypes.object,
  location: PropTypes.object.isRequired,
  categoriesLoading: PropTypes.bool.isRequired,
  postsLoading: PropTypes.bool.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};

Home.defaultProps = {
  match: {},
  categories: {},
  selectedCatItems: {},
  selectedCategory: {},
};

const mapSelectorToProps = (state, ownProps) => ({
  selectedCatItems: selectAllPosts(state, 'reverse'),
  categories: selectCategories(state),
  selectedCategory: selectCategory(state, ownProps.match.params.id),
  categoriesLoading: selectCategoriesLoading(state),
  postsLoading: selectPostLoading(state),
});

const mapDispatchToProps = {
  fetchPosts: fetchPostsRedux,
  openSnackbar: openSnackbarRedux,
};

export default connect(
  mapSelectorToProps,
  mapDispatchToProps,
)(Home);
