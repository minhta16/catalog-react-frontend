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

/**
 * This component creates a confirm dialog which calls onConfirm when the user clicks confirm and onCancel when the user clicks cancel
 */
export function ConfirmDialog(props) {
  const { title, contentText, open, onCancel, onClose, onConfirm } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{contentText}</Typography>
      </DialogContent>
      <DialogActions>
        <Button id="confirm-dialog-confirm" onClick={onConfirm} color="primary">
          Confirm
        </Button>
        <Button id="confirm-dialog-cancel" onClick={onCancel}>
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
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
};

ConfirmDialog.defaultProps = {
  title: '',
  contentText: '',
  open: false,
  onCancel: () => {},
  onConfirm: () => {},
  onClose: () => {},
};

export default ConfirmDialog;
