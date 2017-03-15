import React, {PropTypes} from 'react';
import {VideoComment} from 'components';

function getContent(videoHandler) {
  return (<VideoComment clickHandler={(param) => {
    if (videoHandler) {
      videoHandler(param);
    }
  }}/>);
}

const VideoCommentsContainer = (props) => {
  const content = getContent(props.videoHandler);
  const styles = require('./VideoCommentsContainer.scss');
  return (
    <ul className={styles.list}>
      {content}
    </ul>
  );
};

VideoCommentsContainer.propTypes = {
  videoHandler: PropTypes.func,
};

export default VideoCommentsContainer;
