import React from 'react';
import {VideoComment} from 'components';

function getContent() {
  return (<VideoComment/>);
}

const VideoCommentsContainer = () => {
  const content = getContent();
  return (
    <ul style={{listStyleType: 'none', margin: '0', padding: '0', overflow: 'hidden'}}>
      {content}
      {content}
      {content}
    </ul>
  );
};

VideoCommentsContainer.propTypes = {};

export default VideoCommentsContainer;
