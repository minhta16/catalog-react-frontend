import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectCurrentUserPost, selectCurrentUserProp } from 'selectors/users';
import { modifyPostAndRefetch, addPostAndRefetch } from 'actions/posts';
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

  handleOnSubmit = async () => {
    const { token, match } = this.props;
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
    // this.setState({
    //   redirect: true,
    // });
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
      return <Redirect exact to={`/${match.params.id}/${match.params.postId}`} />;
    }
    return (
      <Container maxWidth="lg">
        <Paper className="paper">
          {editing ? (
            <Typography variant="h4">Edit Post</Typography>
          ) : (
            <Typography variant="h4">New Post</Typography>
          )}
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
          <Button color="primary" onClick={this.handleOnSubmit}>
            Submit
          </Button>
          <Button>Cancel</Button>
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  post: selectCurrentUserPost(state, ownProps.match.params.postId),
  token: selectCurrentUserProp(state, 'token'),
  categories: selectCategories(state),
});

ModifyItem.propTypes = {
  match: PropTypes.object.isRequired,
  post: PropTypes.object,
  token: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
};

ModifyItem.defaultProps = {
  post: {},
};

export default connect(mapStateToProps)(ModifyItem);
