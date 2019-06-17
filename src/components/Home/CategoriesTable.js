import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Grid,
  MenuItem,
  MenuList,
  Typography,
  Divider,
  CircularProgress,
} from '@material-ui/core';

import { Link } from 'react-router-dom';

class CategoriesTable extends Component {
  state = {};

  render() {
    const {
      categories,
      selectedCatId,
      selectedCatItems,
      fetchPosts,
      selectedCat,
      categoriesLoading,
      postsLoading,
    } = this.props;
    const selectedCatName = selectedCat ? selectedCat.name : '';
    return (
      <Paper>
        {/* Create a loading animation if the categories are loading */}
        {categoriesLoading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={3} className="vertical-divider">
              <Typography variant="h4" className="mainmenu-categories-header">
                Categories
              </Typography>
              <MenuList>
                {categories.map((category) => (
                  <MenuItem
                    className="categoryMenuItem"
                    key={category.id}
                    selected={String(selectedCatId) === String(category.id)}
                    component={Link}
                    to={`/${category.id}`}
                    onClick={() => fetchPosts(category.id)}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Grid>
            <Grid item xs={9}>
              {/* Create a loading animation if the posts are loading */}
              {postsLoading ? (
                <CircularProgress />
              ) : (
                <div>
                  <Typography id="categories-table-name-typo" className="left-margin" variant="h4">
                    {selectedCatId ? selectedCatName : 'Choose a category'}
                  </Typography>
                  <Divider variant="middle" />
                  {/* A list of items to be selected, click to redirect */}
                  <MenuList>
                    {/* If selectedCatID is available then display the menu. If not, the right side will display a message telling the user to select a category */}
                    {selectedCatId ? (
                      selectedCatItems.map((item) => (
                        <MenuItem
                          className="itemsMenuItem"
                          key={item.id}
                          component={Link}
                          to={`/${selectedCatId}/${item.id}`}
                        >
                          {item.name}
                        </MenuItem>
                      ))
                    ) : (
                      <Typography className="itemTypography" variant="body1">
                        Please select a category on the left to view its items.
                      </Typography>
                    )}
                  </MenuList>
                </div>
              )}
            </Grid>
          </Grid>
        )}
      </Paper>
    );
  }
}

CategoriesTable.propTypes = {
  selectedCatId: PropTypes.string,
  categories: PropTypes.array.isRequired,
  selectedCatItems: PropTypes.array.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  selectedCat: PropTypes.object.isRequired,
  categoriesLoading: PropTypes.bool.isRequired,
  postsLoading: PropTypes.bool.isRequired,
};

CategoriesTable.defaultProps = {
  selectedCatId: '',
};

export default CategoriesTable;
