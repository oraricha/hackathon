import React, {Component, PropTypes} from 'react';
const styles = require('./Tile.scss');

export default class Tile extends Component {
  static propTypes = {
    layers: PropTypes.arrayOf(PropTypes.node).isRequired,
    flipDelay: PropTypes.number,
    ratio: PropTypes.number,
    paddingX: PropTypes.number,
    paddingRatio: PropTypes.number,
  };

  static defaultProps = {
    ratio: 1,
    paddingX: 5,
    paddingRatio: 1
  };

  constructor(props) {
    super(props);
    this.state = {
      flip: false,
      flipInterval: null,
    };
  }

  componentDidMount() {
    this.autoPlay(this.props.flipDelay);
  }

  componentWillUnmount() {
    clearInterval(this.state.flipInterval);
  }

  autoPlay(delay) {
    if (delay) {
      this.setState({
        flipInterval: setInterval(() => {
          this.setState({flip: !this.state.flip});
        }, delay)
      });
    }
  }

  generateCardLayers() {
    const {layers} = this.props;
    let degrees = 0;
    return layers.slice(0, 2).map(item => {
      const layer = (
          <figure style={{transform: `rotateY(${degrees}deg)`, WebkitTransform: `rotateY(${degrees}deg)`}} key={degrees}>
            {item}
          </figure>);
      degrees += 180;
      return layer;
    });
  }

  render() {
    const {ratio, paddingX, paddingRatio} = this.props; // eslint-disable-line no-shadow
    const paddingBottom = `calc(${100 / ratio}% + ${(paddingX * paddingRatio)}px)`;
    const layersMarkup = this.generateCardLayers();
    const flip = this.state.flip ? styles.flip : '';
    const cardStyle = {paddingBottom};

    return (
        <div className={styles.container}>
          <div style={cardStyle} className={`${styles.card} ${flip}`}>
            {layersMarkup}
          </div>
        </div>
    );
  }
}

