import React, {Component, PropTypes} from 'react';

class VideoPlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRecording: false
    };
  }

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

  recordSuccessCb(stream) {
    const recorder = this.refs.recorder;
    const source = window.webkitURL.createObjectURL(stream);
    recorder.autoplay = true;
    recorder.src = source;
    this.setState({isRecording: true});
    console.log(stream);
  }

  recordFailCb(err) {
    console.log(err);
    if (err.code === 1) {
      alert('You can click the button again anytime to enable.');
    }
  }

  record() {
    if (this.state.isRecording) {}
    else {
      navigator.webkitGetUserMedia({
        video: {width: 280, height: 720},
        audio: true
      }, this.recordSuccessCb.bind(this), this.recordFailCb.bind(this));
    }
  }

  render() {
    // const {url} = this.props;
    const {isRecording} = this.state;
    const styles = require('./VideoRecorder.scss');
    this.updatePlayerState();
    return (
      <div>
        <video ref="recorder" style={{width: '100%'}}
               src="">
        </video>

        <button className={`${styles['record-btn']} ${isRecording ? styles.active : ''}`} onClick={this.record.bind(this)}/>
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  url: PropTypes.string,
  autoPlay: PropTypes.bool,
};


export default VideoPlayer;
