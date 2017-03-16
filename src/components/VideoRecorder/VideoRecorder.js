import React, {Component, PropTypes} from 'react';
import RecordRTC from 'recordrtc';

class VideoPlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      recordVideo: null,
      uploading: false,
      uploadSuccess: null,
      stream: null
    };

    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
  }

  // updatePlayerState() {
  //   const player = this.refs.player;
  //   if (!player) {
  //     return;
  //   }
  //
  //   if (player.readyState === 0) {
  //     setTimeout(function() { // eslint-disable-line
  //       this.updatePlayerState();
  //     }.bind(this), 1000);
  //     return;
  //   }
  //
  //   player.load();
  //   player.pause();
  //
  //   if (this.props.autoPlay && player.paused) {
  //     player.play();
  //   }
  // }

  startRecord(stream) {
    this.setState({
      isRecording: true,
      recordVideo: RecordRTC(stream, { type: 'video' }),
      stream: stream
    });
    // this.state.recordVideo = RecordRTC(stream, { type: 'video' });
    this.state.recordVideo.startRecording();
  }
  
  stopStream() {
    console.log('tracks: ', this.state.stream.getTracks());
    const audioTrack = this.state.stream.getTracks()[0];
    const videoTrack = this.state.stream.getTracks()[1];
    audioTrack.stop();
    videoTrack.stop();
  }

  stopRecord() {
    this.setState({isRecording: false});
    this.state.recordVideo.stopRecording(() => {
      this.stopStream();
      // const recorder = this.refs.recorder;
      // let params = {
      //   type: 'video/webm',
      //   data: this.state.recordVideo.blob,
      //   id: Math.floor(Math.random() * 90000) + 10000
      // };

      // recorder.src = this.state.recordVideo.blob;
  

      // get the video file
      // const videoFile = this.state.recordVideo.blob;

      // this.setState({ uploading: true });

      // S3Upload(params)
      //   .then((success) => {
      //     console.log('enter then statement');
      //     if(success) {
      //       console.log(success)
      //       this.setState({ uploadSuccess: true, uploading: false });
      //     }
      //   }, (error) => {
      //     alert(error, 'error occurred. check your aws settings and try again.');
      //   });
    });
  }

  streamSuccessCb(stream) {
    // stream the video
    const recorder = this.refs.recorder;
    const source = window.webkitURL.createObjectURL(stream);
    recorder.autoplay = true;
    recorder.src = source;
    console.log(stream);

    // record the video
    this.startRecord(stream);
    // this.setState({isRecording: true});

    // stop recording after 7 sec
    setTimeout(() => {
      if (this.state.isRecording) {
        this.stopRecord();
      }
    }, 7 * 1000);
  }

  streamFailCb(err) {
    console.log(err);
    if (err.code === 1) {
      alert('You can click the button again anytime to enable.');
    }
  }

  stream() {
    if (this.state.isRecording) {
      this.stopRecord();
    } else {
      navigator.webkitGetUserMedia({
        video: {width: 280, height: 720},
        audio: true
      }, this.streamSuccessCb.bind(this), this.streamFailCb.bind(this));
    }
  }

  render() {
    // const {url} = this.props;
    const {isRecording} = this.state;
    const styles = require('./VideoRecorder.scss');
    // this.updatePlayerState();
    return (
      <div>
        <video ref="recorder" style={{width: '100%'}}
               src="">
        </video>

        <button className={`${styles['record-btn']} ${isRecording ? styles.active : ''}`} onClick={this.stream.bind(this)}/>
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  url: PropTypes.string,
  autoPlay: PropTypes.bool,
};


export default VideoPlayer;
