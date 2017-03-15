import React, {PropTypes} from 'react';
import YouTube from 'react-youtube';


function youtubePlayerOptions() {
  return ({
    height: '100%',
    width: '100%',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      showinfo: 0,
      controls: 1,
      frameborder: 0,
      playsinline: 1,
      rel: 0,
      modestbranding: 0
    }
  });
}

const TileLayerVideoBackground = (props) => {
  const {backgroundRef, onReady, placeholderColor} = props;
  const opts = youtubePlayerOptions();
  const _onReady = (event) => {
    event.target.mute();
    event.target.seekTo(0);
    onReady();
  };
  const _onEnd = (event) => {
    event.target.seekTo(0);
  };
  //
  return (
    <div style={{width: '100%', height: '100%', backgroundColor: placeholderColor}}>
      <YouTube videoId={backgroundRef.videoId} opts={opts} onReady={_onReady} onEnd={_onEnd}/>
    </div>
  );
};

TileLayerVideoBackground.propTypes = {
  backgroundColor: PropTypes.string,
  placeholderColor: PropTypes.string,
  backgroundRef: PropTypes.object, // { "type": "youtube", "videoId": "oA997wa8V_A", "category": "news" }
  delay: PropTypes.func,
  //
  backgroundLoaded: PropTypes.bool,
  //
  onReady: PropTypes.func,
};

export default TileLayerVideoBackground;
