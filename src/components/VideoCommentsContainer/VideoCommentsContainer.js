import React from 'react';
import {VideoComment} from 'components';

function getContent() {
  return (<VideoComment/>);
}

const VideoCommentsContainer = () => {
  const content = getContent();
  const styles = require('./VideoCommentsContainer.scss');
  return (
    <ul className={styles.list}>
      {content}
      {content}
      {content}
    </ul>
  );
};

VideoCommentsContainer.propTypes = {};

export default VideoCommentsContainer;
