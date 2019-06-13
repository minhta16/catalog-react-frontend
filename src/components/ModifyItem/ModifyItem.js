import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { selectCurrentUserPost, selectCurrentUserProp } from 'selectors/users';
import {
  modifyPostAndRefetch as modifyPostAndRefetchRedux,
  addPostAndRefetch as addPostAndRefetchRedux,
} from 'actions/posts';
import { Typography, Container, Paper, TextField, Button, MenuItem } from '@material-ui/core';
import { selectCategories } from 'selectors/categories';

export class ModifyItem extends Component {
  state = {
    title: '',
    description: '',
    editing: false,
    redirect: false,
    selectedCategory: 0,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();

    const { token, match, modifyPostAndRefetch, addPostAndRefetch } = this.props;
    const { title, description, editing, selectedCategory } = this.state;

    if (editing) {
      modifyPostAndRefetch(token, match.params.id, match.params.postId, {
        name: title,
        description,
        price: 0,
      });
    } else {
      addPostAndRefetch(token, selectedCategory, {
        name: title,
        description,
        price: 0,
      });
    }
    this.setState({
      redirect: true,
    });
  };

  handleCategoryChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount = () => {
    const { match, post } = this.props;
    if (match.params.id) {
      this.setState(
        {
          editing: true,
        },
        () => {
          this.setState({
            title: post.name,
            description: post.description,
            selectedCategory: match.params.id,
          });
        },
      );
    }
  };

  render() {
    const { title, description, editing, redirect, selectedCategory } = this.state;
    const { match, categories } = this.props;

    if (redirect) {
      let path = `/${match.params.id}/${match.params.postId}`;
      if (!editing) {
        path = `/${match.params.id}`;
      }
      return <Redirect exact to={path} />;
    }
    return (
      <Container maxWidth="lg">
        <Paper className="paper">
          {editing ? (
            <Typography variant="h4">Edit Post</Typography>
          ) : (
            <Typography variant="h4">New Post</Typography>
          )}
          <form onSubmit={this.handleOnSubmit} autoComplete="off">
            <TextField
              id="categories"
              name="selectedCategory"
              select
              label="Category"
              fullWidth
              value={selectedCategory}
              onChange={this.handleCategoryChange}
              disabled={editing}
              required
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              id="title"
              label="Title"
              value={title}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
            />
            <TextField
              required
              id="description"
              label="Description"
              value={description}
              onChange={this.handleChange}
              margin="normal"
              fullWidth
              multiline
            />
            <Button color="primary" type="submit">
              Submit
            </Button>
            <Button component={Link} exact="true" to="/profile">
              Cancel
            </Button>
          </form>
        </Paper>
      </Container>
    );
  }
}

ModifyItem.propTypes = {
  match: PropTypes.object.isRequired,
  post: PropTypes.object,
  token: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  addPostAndRefetch: PropTypes.func.isRequired,
  modifyPostAndRefetch: PropTypes.func.isRequired,
};

ModifyItem.defaultProps = {
  post: {},
};

const mapStateToProps = (state, ownProps) => ({
  post: selectCurrentUserPost(state, ownProps.match.params.postId),
  token: selectCurrentUserProp(state, 'token'),
  categories: selectCategories(state),
});

const mapDispatchToProps = {
  modifyPostAndRefetch: modifyPostAndRefetchRedux,
  addPostAndRefetch: addPostAndRefetchRedux,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModifyItem);
