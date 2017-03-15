/**
 * Created by oriavraham on 21/09/2016.
 */

import React, {Component, PropTypes} from 'react';import {
  generateImageUrl,
  generateYoutubePreviewUrl,
  generateStaticImage
} from '../../helpers/prefixes';
import {Cell} from 'radium-grid';
const styles = require('./TileCarusel.scss');

class TileCarusel extends Component {

  constructor() {
    super();
    this.state = {slideIndex: 0};
  }

  componentWillMount() {
    const isClient = (typeof window !== 'undefined' && window.document);
    const imagesSrc = this.props.children.map(child => {
      const imageBackground = (child.props.model.teasers && child.props.model.teasers[0].image.background)
        || (child.props.model.discoverImage && child.props.model.discoverImage)
        || (child.props.model.image && child.props.model.image)
        || [{}];
      const imageVideoBackground = child.props.model.teasers ? child.props.model.teasers[0].image.id : '';
      const path = generateStaticImage(imageBackground.path || '')
        || generateImageUrl(imageBackground[0].image)
        || generateYoutubePreviewUrl(imageVideoBackground);
      return {path: path, loaded: false};
    });
    const intervalId = isClient ? setInterval(this.timerEnded.bind(this), this.props.timeToChange * 1000) : '';
    this.setState({intervalId: intervalId, images: imagesSrc});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  setCurrent(index) {
    clearInterval(this.state.intervalId);
    const intervalId = setInterval(this.timerEnded.bind(this), this.props.timeToChange * 1000);
    this.setState({slideIndex: index, intervalId: intervalId});
  }

  timerEnded() {
    this.setState({slideIndex: (this.state.slideIndex + 1) % (this.props.children.length)});
  }

  generatePointers() {
    const {children} = this.props;
    return (
      <ul className={styles['carousel-indicators-container']} style={{width: `${children.length * 10}%`}}>
        {children.map((elem, index) => (
          <li key={index} className={`${styles['carousel-indicators']} ${index === this.state.slideIndex ? styles.active : '' }`} onClick={() => this.setCurrent(index)}> </li>
        ))}
      </ul>
    );
  }
  generateArrow(left) {
    return (
      <div className={`${styles['carusel-arrow-container']} ${left ? styles['left-arrow'] : ''}`} onClick={() => this.setCurrent(this.state.slideIndex + (left ? -1 : 1) % 3)}>
        <div className={`${styles['carusel-arrow-sub-container']} ${left ? styles['left-arrow'] : ''}`}>
          <label className={`ic icon-arrow-${left ? 'left' : 'right'} ${styles.arrow}`} />
        </div>
      </div>
    );
  }

  imageLoaded(ind) {
    const newImages = this.state.images.map((image, index) => {
      if (index === ind) image.loaded = true;
      return image;
    });
    const allImageLoaded = !(newImages.filter(img => !img.loaded).length);
    // When all images are loaded we need to wait for animation to finish.
    if (allImageLoaded) {
      setTimeout(function() { // eslint-disable-line
        this.setState({childrenReady: true});
      }.bind(this), 3000);
    }
    this.setState({images: newImages});
  }

  render() {
    const {children} = this.props;
    const childrenHtml = children.map((elem, index) => {
      const style = {left: `${(index - this.state.slideIndex) * (100)}%`};
      return (
        <div key={index} className={`${styles.step} ${index === this.state.slideIndex ? styles.current : '' }`}
        style={style}>
          {elem}
        </div>
      );
    });
    const displayControls = (this.state.childrenReady && this.props.showControls);
    return (
      <Cell cellWidth="1/1" style={{position: 'absolute', height: '100%', width: '100%'}}>
        <div className={styles.container}>
          {childrenHtml}
          {this.state.slideIndex !== 0 && displayControls ? this.generateArrow(true) : ''}
          {this.state.slideIndex !== (this.props.children.length - 1) && displayControls ? this.generateArrow(false) : ''}
          {displayControls ? this.generatePointers() : ''}
          {this.state.childrenReady ? '' : this.state.images.map((source, index) => {
            return (<img key={index} src={source}
                 style={{visibility: 'hidden'}}
                 onLoad={() => {
                   this.imageLoaded(index);
                 }}
                 onError={() => {
                   this.imageLoaded(index);
                 }}/>);
          })}
        </div>
      </Cell>
    );
  }
}

TileCarusel.defaultProps = {
  showControls: true,
};

TileCarusel.propTypes = {
  children: PropTypes.node,
  timeToChange: PropTypes.number,
  showControls: PropTypes.bool,
};

export default TileCarusel;
