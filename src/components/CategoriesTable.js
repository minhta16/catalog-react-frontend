import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Grid, MenuItem, MenuList, Typography, Divider,
} from '@material-ui/core';

import { Link } from 'react-router-dom';

class CategoriesTable extends Component {
  state = {
    categories: {
      Football: {
        id: 1,
        name: 'Football',
      },
      Soccer: { id: 2, name: 'Soccer' },
    },
  };

  render() {
    const { categories } = this.state;
    const { categoryName } = this.props;
    return (
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={3} className="vertical-divider">
            <Typography variant="h4" className="mainmenu-categories-header">
              Categories
            </Typography>
            <MenuList>
              {Object.keys(categories).map(key => (
                <MenuItem
                  key={key}
                  selected={categoryName === key}
                  // onClick={this.handleItemClick(category)}
                  component={Link}
                  to={`/${categories[key].name}`}
                >
                  {categories[key].name}
                </MenuItem>
              ))}
            </MenuList>
          </Grid>
          <Grid item xs={9}>
            <Typography className="left-margin" variant="h4">
              {categoryName || 'Choose a category'}
            </Typography>
            <Divider variant="middle" />
            <MenuList>
              {categoryName ? (
                Object.keys(categories).map(key => <MenuItem key={key}>{key}</MenuItem>)
              ) : (
                <Typography variant="body1">Please select a category on the left.</Typography>
              )}
            </MenuList>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

CategoriesTable.propTypes = {
  categoryName: PropTypes.string.isRequired,
};

export default CategoriesTable;
