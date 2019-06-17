import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { selectCurrentUserPost, selectCurrentUserProp } from 'selectors/users';
import { selectCategories } from 'selectors/categories';
import {
  modifyPostAndRefetch as modifyPostAndRefetchRedux,
  addPostAndRefetch as addPostAndRefetchRedux,
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
    selectedCategory: this.props.categories.length ? this.props.categories[0].id : '0',
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
      let path = {
        pathname: `/${match.params.id}/${match.params.postId}`,
        snackbarMess: 'Post edited!',
      };
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
            <Grid container justify="space-evenly">
              <Button variant="contained" color="primary" type="submit">
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
