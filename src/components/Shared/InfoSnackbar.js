import React from 'react';
import PropTypes from 'prop-types';

import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

/**
 * This component creates a snackbar which display a message and a cancel button
 */
export function InfoSnackbar(props) {
  const { open, onClose, message } = props;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      message={message}
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
}

InfoSnackbar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  message: PropTypes.string,
};

InfoSnackbar.defaultProps = {
  open: false,
  onClose: () => {},
  message: '',
};

export default InfoSnackbar;
