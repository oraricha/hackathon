import React from 'react';
const styles = require('./VideoComment.scss');

function getContent() {
  return (
    <img src="https://ig-s-a-a.akamaihd.net/hphotos-ak-xta1/t51.2885-15/s1080x1080/e15/fr/16908640_1939071232978320_3200677111505354752_n.jpg"
         className={styles.image}/>
    );
}

const VideoComment = () => {
  const content = getContent();

  return (
    <li className={styles.item}>
      {content}
    </li>
  );
};

VideoComment.propTypes = {};

export default VideoComment;
