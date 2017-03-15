import React, {Component, PropTypes} from 'react';

class VideoPlayer extends Component {

  updatePlayerState() {
    const player = this.refs.player;
    if (!player) {
      return;
    }

    if (player.readyState === 0) {
      setTimeout(function() { // eslint-disable-line
        this.updatePlayerState();
      }.bind(this), 1000);
      return;
    }

    player.load();
    player.pause();

    if (this.props.autoPlay && player.paused) {
      player.play();
    }
  }

  render() {
    const {url} = this.props;
    this.updatePlayerState();
    return (
      <video ref="player" style={{width: '100%'}}
             src={url}>
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  url: PropTypes.string,
  autoPlay: PropTypes.bool,
};


export default VideoPlayer;
