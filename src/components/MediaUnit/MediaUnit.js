/**
 * Created by oriavraham on 03/11/2016.
 */

import React, {PropTypes} from 'react';
import {
  IframeWrapper,
  MediaOverlay,
} from 'components';


const MediaUnit = (props) => {
  const {src, height, overlay, onDismiss, children, loadingBarActions} = props; // eslint-disable-line
  return (
      <div style={{position: 'relative', height: height, width: '100%', transition: 'opacity 1s ease-out'}}>
        <MediaOverlay onDismiss={onDismiss}
                      isOpen={overlay}>
          {children}
          </MediaOverlay>
        <IframeWrapper src={src} loadingBarActions={loadingBarActions}/>
      </div>
  );
};

MediaUnit.propTypes = {
  overlay: PropTypes.bool,
  onDismiss: PropTypes.func,
  dispatch: PropTypes.func,
  height: PropTypes.number,
  src: PropTypes.string,
  mediaId: PropTypes.string,
  prevMedia: PropTypes.object,
  nextMedia: PropTypes.object,
  children: PropTypes.node,
};
MediaUnit.defaultProps = {};

export default MediaUnit;
