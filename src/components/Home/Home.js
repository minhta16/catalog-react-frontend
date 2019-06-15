import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from '@material-ui/core';
import CategoriesTable from 'components/Home/CategoriesTable';

import { fetchCategories as fetchCategoriesRedux } from 'actions/categories';
import { fetchPosts as fetchPostsRedux } from 'actions/posts';
import { selectAllPosts } from 'selectors/posts';
import { selectCategories, selectCategory, selectCategoriesLoading } from 'selectors/categories';
import InfoSnackbar from 'components/Shared/InfoSnackbar';

export class Home extends Component {
  state = {
    openSnackbar: false,
  };

  componentDidMount() {
    const { fetchCategories, match, fetchPosts, location } = this.props;
    fetchCategories();
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
    } = this.props;
    const { openSnackbar } = this.state;
    return (
      <Container maxWidth="lg">
        {!categoriesLoading && (
          <CategoriesTable
            categories={categories}
            selectedCatId={match.params.id}
            selectedCat={selectedCategory}
            selectedCatItems={selectedCatItems}
            fetchPosts={fetchPosts}
          />
        )}
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
  fetchCategories: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  selectedCatItems: PropTypes.array,
  selectedCategory: PropTypes.object,
  location: PropTypes.object.isRequired,
  categoriesLoading: PropTypes.bool.isRequired,
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
  categoriesLoading: selectCategoriesLoading(state),
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
