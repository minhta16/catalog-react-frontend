import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from '@material-ui/core';
import CategoriesTable from 'components/Home/CategoriesTable';
import { fetchPosts as fetchPostsRedux } from 'actions/posts';
import { selectAllPosts, selectPostLoading } from 'selectors/posts';
import { selectCategories, selectCategory, selectCategoriesLoading } from 'selectors/categories';
import InfoSnackbar from 'components/Shared/InfoSnackbar';

export class Home extends Component {
  state = {
    openSnackbar: false,
  };

  /**
   * always fetchCategories upon mount. if the user is viewing a category then fetch the posts in that category. If there is a snackbarMessage then open the snackbar
   */
  componentDidMount() {
    const { match, fetchPosts, location } = this.props;
    if (match.params.id) {
      fetchPosts(match.params.id);
    }
    if (location.snackbarMess) {
      this.closeSnackbar(false)();
    }
  }

  closeSnackbar = (close) => () => {
    this.setState({
      openSnackbar: !close,
    });
  };

  render() {
    const {
      match,
      categories,
      selectedCatItems,
      fetchPosts,
      selectedCategory,
      location,
      categoriesLoading,
      postsLoading,
    } = this.props;
    const { openSnackbar } = this.state;
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

        <InfoSnackbar
          open={openSnackbar}
          onClose={this.closeSnackbar(true)}
          message={location.snackbarMess}
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
};

export default connect(
  mapSelectorToProps,
  mapDispatchToProps,
)(Home);
