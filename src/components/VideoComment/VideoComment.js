import React, {PropTypes} from 'react';
const styles = require('./VideoComment.scss');

function getContent(placeHolder, clickHandler, videoURL) {
  return (
    <img src={placeHolder} className={styles.image} onClick={() => {
      if (clickHandler && videoURL) {
        clickHandler(videoURL);
      }
    }}/>
    );
}

const VideoComment = (props) => {
  const content = getContent(props.placeHolder, props.clickHandler, props.videoURL);
  return (
    <li className={styles.item}>
      {content}
    </li>
  );
};

VideoComment.propTypes = {
  placeHolder: PropTypes.string,
  videoURL: PropTypes.string,
  clickHandler: PropTypes.func,
};

VideoComment.defaultProps = {
  placeHolder: 'https://ig-s-a-a.akamaihd.net/hphotos-ak-xta1/t51.2885-15/s1080x1080/e15/fr/16908640_1939071232978320_3200677111505354752_n.jpg',
  videoURL: 'https://ig-l-d-a.akamaihd.net/hphotos-ak-xta1/t50.2886-16/17288169_1857684181156419_5106434657147158528_n.mp4',
};

export default VideoComment;
