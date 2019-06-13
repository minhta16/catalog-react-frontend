import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Typography, Grid, IconButton, Menu, MenuItem, Link as MUILink } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';
import ConfirmDialog from '../Shared/ConfirmDialog';

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

  toggleDeleteDialog = () => {
    const { openConfirm } = this.state;
    this.setState({
      openConfirm: !openConfirm,
    });
  };

  render() {
    const { post, subtitleLength } = this.props;
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
            <UpdateIcon color="primary" style={{ margin: '0 0.5rem 0 0' }} />
            <Typography variant="body1">Update</Typography>
          </Grid>
        </MenuItem>
        <MenuItem id="post-item-delete" onClick={this.toggleDeleteDialog}>
          <DeleteIcon style={{ margin: '0 0.5rem 0 0', color: red[500] }} />
          <Typography variant="body1">Delete</Typography>
        </MenuItem>
      </Menu>
    );

    return (
      <Grid container justify="space-between" spacing={2}>
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
            <Typography variant="subtitle1">{`Created: ${post.created}`}</Typography>
            <Typography variant="caption">
              {`${post.description.substring(subtitleLength)}...`}
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
        <ConfirmDialog
          open={openConfirm}
          title="Delete"
          onConfirm={this.toggleDeleteDialog}
          onClose={this.toggleDeleteDialog}
          contentText={`Are you sure you want to delete ${post.name}?`}
        />
      </Grid>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  subtitleLength: PropTypes.number,
};

PostItem.defaultProps = {
  subtitleLength: 100,
};

export default PostItem;
