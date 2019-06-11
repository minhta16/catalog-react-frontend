import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Grid, MenuItem, MenuList, Typography, Divider } from '@material-ui/core';

import { Link } from 'react-router-dom';

class CategoriesTable extends Component {
  state = {};

  render() {
    const { categories, selectedCatId, selectedCatItems, fetchPosts } = this.props;
    const selectedCatName = categories[selectedCatId] ? categories[selectedCatId].name : '';
    return (
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={3} className="vertical-divider">
            <Typography variant="h4" className="mainmenu-categories-header">
              Categories
            </Typography>
            <MenuList>
              {Object.keys(categories).map((key) => (
                <MenuItem
                  key={key}
                  selected={selectedCatId === key}
                  component={Link}
                  to={`/${key}`}
                  onClick={() => fetchPosts(key)}
                >
                  {categories[key].name}
                </MenuItem>
              ))}
            </MenuList>
          </Grid>
          <Grid item xs={9}>
            <Typography className="left-margin" variant="h4">
              {selectedCatId ? selectedCatName : 'Choose a category'}
            </Typography>
            <Divider variant="middle" />
            <MenuList>
              {selectedCatId ? (
                Object.keys(selectedCatItems).map((key) => (
                  <MenuItem key={key} component={Link} to={`/${selectedCatId}/${key}`}>
                    {selectedCatItems[key].name}
                  </MenuItem>
                ))
              ) : (
                <Typography variant="body1">
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
  categories: PropTypes.object.isRequired,
  selectedCatItems: PropTypes.object.isRequired,
  fetchPosts: PropTypes.func.isRequired,
};

CategoriesTable.defaultProps = {
  selectedCatId: '',
};

export default CategoriesTable;
