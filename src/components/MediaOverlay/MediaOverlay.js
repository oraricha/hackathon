import React, {PropTypes} from 'react';
import Overlay from '../Overlay/Overlay';
// import {Overlay} from 'components';

const MediaOverlay = (props) => {
  const {isOpen, onDismiss, children} = props;
  return (
      <Overlay width={50} showClose absolute onDismiss={onDismiss}
               open={isOpen}>
        <div>
          {children}
        </div>
      </Overlay>
  );
};

MediaOverlay.propTypes = {
  isOpen: PropTypes.bool,
  onDismiss: PropTypes.func,
  children: PropTypes.node,
};
MediaOverlay.defaultProps = {};

export default MediaOverlay;
