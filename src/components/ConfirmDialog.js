import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  DialogActions,
} from '@material-ui/core';

export function ConfirmDialog(props) {
  const { title, contentText, open, onClose, onConfirm } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{contentText}</Typography>
      </DialogContent>
      <DialogActions>
        <Button id="confirm-dialog-login" onClick={onConfirm} color="primary">
          Confirm
        </Button>
        <Button id="login-dialog-close" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  title: PropTypes.string,
  contentText: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

ConfirmDialog.defaultProps = {
  title: '',
  contentText: '',
  open: false,
  onClose: () => {},
  onConfirm: () => {},
};

export default ConfirmDialog;
