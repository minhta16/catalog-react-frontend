import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Grid, MenuItem, MenuList, Typography, Divider } from '@material-ui/core';

import { Link } from 'react-router-dom';

class CategoriesTable extends Component {
  state = {};

  render() {
    const { categories, selectedCatId, selectedCatItems, fetchPosts, selectedCat } = this.props;
    const selectedCatName = selectedCat ? selectedCat.name : '';
    return (
      <Paper>
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
                  selected={selectedCatId === category.id}
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
            <Typography id="categories-table-name-typo" className="left-margin" variant="h4">
              {selectedCatId ? selectedCatName : 'Choose a category'}
            </Typography>
            <Divider variant="middle" />
            <MenuList>
              {selectedCatId ? (
                selectedCatItems.map((item) => (
                  <MenuItem
                    className="itemsMenuItem"
                    key={item.name}
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
          </Grid>
        </Grid>
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
};

CategoriesTable.defaultProps = {
  selectedCatId: '',
};

export default CategoriesTable;
