// code from https://material-ui.com/components/app-bar/
import React from 'react';
import PropTypes from 'prop-types';
import { useScrollTrigger, Slide } from '@material-ui/core';

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  window: PropTypes.func,
};

HideOnScroll.defaultProps = {
  window: () => {},
};

export default HideOnScroll;
