import React, {Component, PropTypes} from 'react';
//
import {generateStaticImage} from '../../helpers/prefixes';
//
const noSrcGif = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // eslint-disable-line
const styles = require('../TileLayer/TileLayer.scss');

class TileLayerImageBackground extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.imageDidLoad();
  }


  imageDidLoad() {
    if (this.refs.background && this.refs.background.complete && !this.props.backgroundLoaded) {
      this.props.onReady();
    }
  }

  generateImageStyle() {
    const {placeholderColor, backgroundColor, backgroundLoaded, delay} = this.props;
    return {
      height: '100%',
      width: '100.5%',
      objectFit: 'cover', // should use props
      fontFamily: "'object-fit: cover'",
      backgroundColor: `${backgroundLoaded || !placeholderColor ?
        backgroundColor :
        placeholderColor}`,
      // transition: 'transform .3s ease-out',
      animationDelay: `${delay()}ms`
    };
  }

  render() {
    const {backgroundRef} = this.props;
    //
    const backgroundImageStyle = this.generateImageStyle();
    //
    return (
      <img ref="background"
           onAnimationEnd={this.props.onAnimationEnded}
           src={generateStaticImage(backgroundRef) || backgroundRef || noSrcGif}
           style={backgroundImageStyle}
           className={`${styles.layer}`}
           onLoad={() => { this.imageDidLoad(); }}
           onError={() => { this.imageDidLoad(); }}
      />
    );
  }
}

TileLayerImageBackground.propTypes = {
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

TileLayerImageBackground.defaultProps = {
  delay: () => {},
  onReady: () => {},
};

export default TileLayerImageBackground;
