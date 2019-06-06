import React, { Component } from 'react';
import {
  Paper, Grid, MenuItem, MenuList, Typography, Divider,
} from '@material-ui/core';

class CategoriesTable extends Component {
  state = {
    selectedCategory: { id: -1, name: '' },
    categories: [
      {
        id: 1,
        name: 'Football',
      },
      { id: 2, name: 'Soccer' },
    ],
  };

  componentDidMount() {
    return 0;
  }

  handleItemClick = category => () => {
    this.setState({
      selectedCategory: category,
    });
  };

  render() {
    const { categories, selectedCategory } = this.state;
    return (
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={3} className="vertical-divider">
            <Typography variant="h4" className="mainmenu-categories-header">
              Categories
            </Typography>
            <MenuList>
              {categories.map(category => (
                <MenuItem
                  key={category.name}
                  selected={selectedCategory.id === category.id}
                  onClick={this.handleItemClick(category)}
                >
                  {category.name}
                </MenuItem>
              ))}
            </MenuList>
          </Grid>
          <Grid item xs={9}>
            <Typography className="left-margin" variant="h4">
              {selectedCategory.name || 'Choose a category'}
            </Typography>
            <Divider variant="middle" />
            <MenuList>
              {categories.map(category => (
                <MenuItem>{category.name}</MenuItem>
              ))}
            </MenuList>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default CategoriesTable;
