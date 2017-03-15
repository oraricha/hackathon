import React, {PropTypes} from 'react';
import TileLayerVideoBackground from './TileLayerVideoBackground';
import TileLayerImageBackground from './TileLayerImageBackground';

const TileLayerBackground = (props) => {
  const {type} = props;
  switch (type) {
    case 'image':
      return (<TileLayerImageBackground {...props}/>);
    case 'video':
      return (<TileLayerVideoBackground {...props}/>);
    default:
      return (<div/>);
  }
};

TileLayerBackground.propTypes = {
  type: PropTypes.string,
  backgroundColor: PropTypes.string,
  placeholderColor: PropTypes.string,
  backgroundRef: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  delay: PropTypes.func,
  //
  backgroundLoaded: PropTypes.bool,
  //
  onAnimationEnded: PropTypes.func,
  onReady: PropTypes.func,
};

export default TileLayerBackground;
