import React, {PropTypes} from 'react';
import {Tile, TileLayer} from 'components';

const VideoTile = (props) => {
  const {video, ...others} = props;
  const frontLayer = (
    <TileLayer placeholderColor="#3D9770"
               background={video} {...props}/>);
  return (
    <Tile {...others} layers={[frontLayer]}/>);
};

VideoTile.propTypes = {
  video: PropTypes.object.isRequired,
};

VideoTile.defaultProps = {
  video: {},
};

export default VideoTile;
