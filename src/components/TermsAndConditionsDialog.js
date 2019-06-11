import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from '@material-ui/core';

export function TermsAndConditionsDialog(props) {
  const { open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Terms and Conditions</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          {[...new Array(50)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            )
            .join('\n')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Got it!</Button>
      </DialogActions>
    </Dialog>
  );
}

TermsAndConditionsDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

TermsAndConditionsDialog.defaultProps = {
  onClose: () => {},
  open: true,
};

export default TermsAndConditionsDialog;
