import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {generateImageUrl, generateYoutubePreviewUrl} from '../../helpers/prefixes';  // eslint-disable-line
import TileLayerBackground from '../TileLayerBackground/TileLayerBackground';
//
const styles = require('./TileLayer.scss');
//
function createStyle(string) {  // eslint-disable-line
  return {__html: `<div style="mix-blend-mode: overlay; width: 100%; height: 100%; ${string}"></div>`};
}

// todo encapsulate background layering :)
export default class TileLayer extends Component {
  static defaultProps = {
    ratio: 1,
    disableSlide: false,
    displayDarknessOverlay: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      backgroundImageLoaded: false,
      animEnded: false,
    };
  }

  delay(url) {
    return () => {
      let val = 0;
      for (let index = 0; index < url.length; index++) {
        val += url.charCodeAt(index);
      }
      return val % 400 * 4;
    };
  }
  /*
   * CUSTOM-STYLES
   * */
  generateDarknessStyle(delay) {
    const {opacity} = this.props;
    return {
      backgroundImage: `radial-gradient(circle, rgba(56, 55, 55, 0.2), rgba(0, 0, 0, 0.780392))`,
      opacity: this.state.backgroundImageLoaded ? opacity : opacity,
      transform: 'scale3d(1,1,1)', // fixing chrome bug with radial circle)
      animationDelay: `${delay()}ms`
    };
  }

  generatePatternStyle(backgroundPattern, delay) {
    return (!backgroundPattern) ? {}
      : {
        background: `url(${generateImageUrl(backgroundPattern)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        width: '100%',
        height: '100%',
        animationDelay: `${delay()}ms`
        // opacity: shouldDisplayChildren
      };
  }
  /*
   * SUB-LAYERS
   * */
  generateBackgroundLayer(backgroundRef, isVideo, delay) {
    const {backgroundColor, placeholderColor} = this.props;
    const backgroundType = isVideo ? 'video' : 'image';
    return (
      <TileLayerBackground
        type={backgroundType}
        backgroundRef={backgroundRef}
        backgroundColor={backgroundColor}
        placeholderColor={placeholderColor}
        delay={delay}
        backgroundLoaded={this.state.backgroundImageLoaded}
        onAnimationEnded={ () => {
          this.setState({animEnded: true});
        }}
        onReady={() => {
          this.setState({backgroundImageLoaded: true});
        }}
      />
    );
  }

  generatePlaceholderLayer(placeholderColor, delay) {
    return (
      <div style={{
        background: placeholderColor,
        animationDelay: `${delay()}ms`
        //   animation: 'all 0.4s',
        //   transform: `translateY(${curtainLocation})`
      }}
           className={`${styles.placeholder} ${styles.curtain}`}></div>
    );
  }

  generatePatternLayer(backgroundPattern, delay) {
    const patStyle = this.generatePatternStyle(backgroundPattern, delay);
    return (
      <div style={patStyle}
           className={`${styles.layer}`}></div>
    );
  }

  generateOverlayLayer(backgroundGradient, delay) {
    const darkness = this.generateDarknessStyle(delay);
    const gradStyle = (backgroundGradient) ? backgroundGradient.style : {};
    if (!backgroundGradient) {
      return (<div style={darkness}
                   className={`${styles.layer} ${styles.opacity}`}></div>);
    } else { // eslint-disable-line
      return (
        <div dangerouslySetInnerHTML={createStyle(gradStyle)}
             style={{animationDelay: `${delay()}ms`}}
             className={`${styles.layer} ${styles.overlay}`}/>);
    }
  }


  render() {
    const {children, interactionId, publisherId, background, placeholderColor, urlPrefix, click, displayDarknessOverlay} = this.props;
    const image = (background && background.image) ? background.image : undefined;
    const imageBackground = (image && image.background && image.background.length > 0) ? image.background[0] : [{}];
    const imageVideoBackground = (imageBackground && imageBackground.image && imageBackground.image.id) || '';
    const backgroundImage = generateImageUrl(imageBackground.image) || generateImageUrl(generateYoutubePreviewUrl(imageVideoBackground));
    const backgroundGradient = imageBackground.gradient;
    const backgroundPattern = imageBackground.pattern;
    //
    const forceShow = (!placeholderColor);
    const url = interactionId ? `/media/${interactionId}` : `${urlPrefix}/${publisherId}` || '';
    //
    const delay = this.delay(url);
    //
    const shouldDisplayChildren = this.state.backgroundImageLoaded || forceShow ? 1 : 1;
    // const noPlaceHolder = placeholderColor ? false : true;
    // todo make a gradient component with params
    // const curtainLocation = this.state.backgroundImageLoaded ? '100%' : '0'; // todo might break SSR
    const animOn = this.state.backgroundImageLoaded && !this.state.animationEnded ? styles.doAnimation : '';
    const animEnded = this.state.animationEnded ? styles.shown : '';
    const disableAnim = this.props.disableSlide ? styles.noSlide : '';
    const pointerStyle = displayDarknessOverlay ? '' : styles.pointer;
    //
    const isVideo = (background && background.videoId);
    const backgroundRef = isVideo ? background : backgroundImage;
    // sub-layers
    const generatedBackgroundLayer = this.generateBackgroundLayer(backgroundRef, isVideo, delay);
    const generatedPlaceholderLayer = !isVideo ? this.generatePlaceholderLayer(placeholderColor, delay) : undefined;
    const generatedPatternLayer = !isVideo ? this.generatePatternLayer(backgroundPattern, delay) : undefined;
    const generatedOverlayLayer = !isVideo && displayDarknessOverlay ? this.generateOverlayLayer(backgroundGradient, delay) : undefined;
    //
    const containerClassName = `${animOn} ${animEnded} ${disableAnim} ${styles.wrapper} ${pointerStyle}`;
    const containerStyle = {overflow: 'hidden', position: 'relative'};
    //
    return isVideo ?
      (<div className={containerClassName} style={containerStyle}>
          {generatedBackgroundLayer}
      </div>) :
      (<div className={containerClassName} style={containerStyle}>
        {generatedPlaceholderLayer}
        {generatedBackgroundLayer}
        {generatedPatternLayer}
        {generatedOverlayLayer}
        <div className={`${styles.layer} ${styles.content}`}
        onClick={() => {
          if (!click) {
            browserHistory.push(`${url}`);
          }
        }}
        style={{opacity: shouldDisplayChildren, animationDelay: `${delay()}ms`}}>
        {children}
        </div>
      </div>);
  }
}

TileLayer.propTypes = {
  children: PropTypes.node,
  interactionId: PropTypes.string,
  publisherId: PropTypes.string,
  backgroundColor: PropTypes.string,
  placeholderColor: PropTypes.string,
  background: PropTypes.object,
  opacity: PropTypes.number,
  ratio: PropTypes.number,
  click: PropTypes.func,
  urlPrefix: PropTypes.string,
  displayDarknessOverlay: PropTypes.bool,
  disableSlide: PropTypes.bool,
};
