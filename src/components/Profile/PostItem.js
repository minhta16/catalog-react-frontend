import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Typography, Grid, IconButton, Menu, MenuItem, Link as MUILink } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';
import { selectCategory } from 'selectors/categories';
import { selectCurrentUserProp } from 'selectors/users';
import { deletePostAndRefetch as deletePostAndRefetchRedux } from 'actions/users';
import ConfirmDialog from 'components/Shared/ConfirmDialog';

export class PostItem extends Component {
  state = {
    anchorEl: undefined,
    openConfirm: false,
  };

  handleClick = (e) => {
    this.setState({
      anchorEl: e.target,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: undefined,
    });
  };

  handleConfirmDelete = async () => {
    const { deletePostAndRefetch, token, post, openSnackbar } = this.props;
    deletePostAndRefetch(token, post.category_id, post.id);
    openSnackbar();
  };

  toggleDeleteDialog = () => {
    const { openConfirm } = this.state;
    this.setState({
      openConfirm: !openConfirm,
    });
  };

  render() {
    const { post, subtitleLength, category } = this.props;
    const { anchorEl, openConfirm } = this.state;

    const menu = (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={this.handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={this.handleClose}
          component={Link}
          exact="true"
          to={`/profile/${post.category_id}/${post.id}/edit`}
        >
          <Grid container alignItems="center">
            <UpdateIcon color="primary" className="icon-padding" />
            <Typography variant="button" color="primary">
              Update
            </Typography>
          </Grid>
        </MenuItem>
        <MenuItem id="post-item-delete" onClick={this.toggleDeleteDialog}>
          <DeleteIcon className="icon-padding" style={{ color: red[500] }} />
          <Typography variant="button" style={{ color: red[500] }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    );

    return (
      <Grid container justify="space-between" spacing={2}>
        <ConfirmDialog
          open={openConfirm}
          title="Delete"
          onConfirm={this.handleConfirmDelete}
          onCancel={this.toggleDeleteDialog}
          onClose={this.toggleDeleteDialog}
          contentText={`Are you sure you want to delete ${post.name}?`}
        />
        <Grid item>
          <Grid container direction="column">
            <MUILink
              variant="h4"
              color="inherit"
              component={Link}
              underline="none"
              exact="true"
              to={`/${post.category_id}/${post.id}`}
            >
              {post.name}
            </MUILink>
            <Typography variant="subtitle1">{`Category: ${category.name}`}</Typography>
            <Typography variant="subtitle1">{`Created: ${post.created}`}</Typography>
            <Typography variant="caption">
              {`Description: ${post.description.substr(0, subtitleLength)}`}
              {post.description.length > subtitleLength && `...`}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography />
          <IconButton onClick={this.handleClick}>
            <MoreVertIcon />
          </IconButton>
        </Grid>
        {menu}
      </Grid>
    );
  }
}

PostItem.propTypes = {
  token: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  subtitleLength: PropTypes.number,
  category: PropTypes.object.isRequired,
  deletePostAndRefetch: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};

PostItem.defaultProps = {
  subtitleLength: 100,
};

const mapStateToProps = (state, ownProps) => ({
  category: selectCategory(state, ownProps.post.category_id),
  token: selectCurrentUserProp(state, 'token'),
});

const mapDispatchToProps = {
  deletePostAndRefetch: deletePostAndRefetchRedux,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostItem);
