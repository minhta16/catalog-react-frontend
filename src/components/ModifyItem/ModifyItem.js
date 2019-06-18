import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { selectCurrentUserPost, selectCurrentUserProp } from 'selectors/users';
import { selectCategories } from 'selectors/categories';
import { selectAddPostSuccess, selectAddPostError } from 'selectors/posts';
import {
  modifyPost as modifyPostRedux,
  addPost as addPostRedux,
  clearPostError as clearPostErrorRedux,
  resetAddPostSuccess as resetAddPostSuccessRedux,
} from 'actions/posts';
import { Typography, Container, Paper, TextField, Button, MenuItem, Grid } from '@material-ui/core';
import BackupIcon from '@material-ui/icons/Backup';
import CancelIcon from '@material-ui/icons/Cancel';

export class ModifyItem extends Component {
  state = {
    title: '',
    description: '',
    editing: false,
    redirect: false,
    // eslint-disable-next-line react/destructuring-assignment
    selectedCategory: this.props.categories.length ? this.props.categories[0].id : '',
    nameWarning: false,
    descriptionWarning: false,
  };

  /**
   * @param {string} name text of name field
   * @returns true if name has length 0 or more than 5
   */
  qualifiedName = (name) => name.length === 0 || name.length >= 5;

  /**
   * @param {string} description text of description field
   * @returns true if description has length 0 or less than 200
   */
  qualifiedDescription = (description) => description.length === 0 || description.length <= 200;

  /**
   * Set the warning state if state is not qualified
   */
  handleCreateWarnings = () => {
    const { title, description } = this.state;
    this.setState({
      nameWarning: !this.qualifiedName(title),
      descriptionWarning: !this.qualifiedDescription(description),
    });
  };

  // Connecting the textfields to the state
  handleChange = (e) => {
    this.setState(
      {
        [e.target.id]: e.target.value,
      },
      this.handleCreateWarnings,
    );
  };

  // Connect category to the state
  handleCategoryChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handle two possible cases:
   * when editing then dispatch a modify action to the current post
   * when not editing then dispatch an add action
   * when done: redirect
   */
  handleOnSubmit = (e) => {
    e.preventDefault();

    const { token, match, modifyPost, addPost } = this.props;
    const { title, description, editing, selectedCategory } = this.state;

    if (editing) {
      modifyPost(token, match.params.id, match.params.postId, {
        name: title,
        description,
        price: 0,
      });
    } else {
      addPost(token, selectedCategory, {
        name: title,
        description,
        price: 0,
      });
    }
  };

  /**
   * Setting editing to be true if category id exists on the link. Also set the title, description, and selectedCategory if category id exists
   */
  componentDidMount = () => {
    const { match, post, resetAddPostSuccess, clearPostError } = this.props;

    resetAddPostSuccess();
    clearPostError();
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

  /**
   * Redirect when addPostSuccess change from false to true
   */
  componentDidUpdate = (prevProps) => {
    const { addPostSuccess } = this.props;
    if (!prevProps.addPostSuccess && addPostSuccess) {
      this.setState({
        redirect: true,
      });
    }
  };

  render() {
    const {
      title,
      description,
      editing,
      redirect,
      selectedCategory,
      nameWarning,
      descriptionWarning,
    } = this.state;
    const { match, categories, errorMessage } = this.props;

    /**
     * If redirect then set the path and return a redirect component
     */
    if (redirect) {
      // If not editing, then return to the new post
      let path = {
        pathname: `/${match.params.id}/${match.params.postId}`,
        snackbarMess: 'Post edited!',
      };
      // If editing, then return to the category
      if (!editing) {
        path = { pathname: `/${selectedCategory}`, snackbarMess: 'Post created!' };
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
          {/* Display the error message if an error occured */}
          {errorMessage &&
            errorMessage.map((message) => (
              <Typography key={message} variant="body1" color="error">
                {`${message}`}
              </Typography>
            ))}
          <form onSubmit={this.handleOnSubmit} autoComplete="off">
            <TextField
              id="categories"
              name="selectedCategory"
              select
              className="left-margin"
              label="Category"
              fullWidth
              value={selectedCategory}
              onChange={this.handleCategoryChange}
              disabled={editing}
              required
              margin="normal"
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
              error={nameWarning}
              helperText="Name needs to be at least 5 characters"
              fullWidth
            />
            <TextField
              required
              id="description"
              label="Description"
              value={description}
              onChange={this.handleChange}
              margin="normal"
              error={descriptionWarning}
              helperText={`Description needs to be less than 200 characters. Current characters: ${description.length}`}
              fullWidth
              multiline
            />
            <Grid container justify="space-evenly">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={nameWarning || descriptionWarning}
              >
                <BackupIcon className="icon-padding" />
                Submit
              </Button>
              <Button variant="contained" component={Link} exact="true" to="/profile">
                <CancelIcon className="icon-padding" />
                Cancel
              </Button>
            </Grid>
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
  addPost: PropTypes.func.isRequired,
  modifyPost: PropTypes.func.isRequired,
  resetAddPostSuccess: PropTypes.func.isRequired,
  addPostSuccess: PropTypes.bool.isRequired,
  errorMessage: PropTypes.array,
  clearPostError: PropTypes.func.isRequired,
};

ModifyItem.defaultProps = {
  post: {},
  errorMessage: [],
};

const mapStateToProps = (state, ownProps) => ({
  post: selectCurrentUserPost(state, ownProps.match.params.postId),
  token: selectCurrentUserProp(state, 'token'),
  categories: selectCategories(state),
  addPostSuccess: selectAddPostSuccess(state),
  errorMessage: selectAddPostError(state),
});

const mapDispatchToProps = {
  modifyPost: modifyPostRedux,
  addPost: addPostRedux,
  resetAddPostSuccess: resetAddPostSuccessRedux,
  clearPostError: clearPostErrorRedux,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModifyItem);
