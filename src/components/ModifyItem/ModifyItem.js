import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectCurrentUserPost } from 'selectors/users';
import { Typography, Container, Paper, TextField } from '@material-ui/core';

export class ModifyItem extends Component {
  state = {
    title: '',
    description: '',
    editing: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
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
          });
        },
      );
    }
  };

  render() {
    const { title, description, editing } = this.state;
    return (
      <Container maxWidth="lg">
        <Paper className="paper">
          {editing ? (
            <Typography variant="h4">Edit Post</Typography>
          ) : (
            <Typography variant="h4">New Post</Typography>
          )}

          <form autoComplete="off">
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
          </form>
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  post: selectCurrentUserPost(state, ownProps.match.params.postId),
});

ModifyItem.propTypes = {
  match: PropTypes.object.isRequired,
  post: PropTypes.object,
};

ModifyItem.defaultProps = {
  post: {},
};

export default connect(mapStateToProps)(ModifyItem);
