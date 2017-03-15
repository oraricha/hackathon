import React from 'react';

function getContent() {
  return (
    <img src="https://ig-s-a-a.akamaihd.net/hphotos-ak-xta1/t51.2885-15/s1080x1080/e15/fr/16908640_1939071232978320_3200677111505354752_n.jpg"
    style={{width: '47px', height: '47px', borderRadius: '23.5px', margin: '0 10px'}}/>
    );
}

const VideoComment = () => {
  const content = getContent();
  return (
    <li style={{float: 'left'}}>
      {content}
    </li>
  );
};

VideoComment.propTypes = {};

export default VideoComment;
