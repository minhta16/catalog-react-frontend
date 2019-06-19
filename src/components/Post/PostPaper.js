import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider, Paper, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export function PostPaper(props) {
  const { header, body, categoryId, categoryName, created } = props;
  return (
    <Paper className="left-margin">
      <Button color="primary" component={Link} to={`/category/${categoryId}`}>
        Back
      </Button>
      <Typography variant="h4">{header}</Typography>
      <Typography variant="subtitle1">{`Created: ${created}`}</Typography>
      <Typography variant="subtitle1">{`Category: ${categoryName}`}</Typography>
      <Divider />
      <Typography variant="body1">{body}</Typography>
    </Paper>
  );
}

PostPaper.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
};

export default PostPaper;
