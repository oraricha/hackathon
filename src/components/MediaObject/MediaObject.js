import React, {Component, PropTypes} from 'react';

export default class MediaObject extends Component {
  static propTypes = {
    imgSrc: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    flagStyle: PropTypes.string,
    flagImageStyle: PropTypes.string,
    flagBodyStyle: PropTypes.string
  }

  render() {
    const {imgSrc} = this.props;
    const styles = require('./MediaObject.scss');

    return (
        <div className={`${styles.flag} ${this.props.flagStyle || ''}`}>
          {(() => {
            if (imgSrc) {
              return (
                  <div
                      className={`${styles.flag__image} ${this.props.flagImageStyle
                                                          || ''}`}>
                    <img src={imgSrc} alt=""/>
                  </div>
              );
            }
          })()}
          <div className={styles.flag__body}>
            {this.props.children}
          </div>
        </div>
    );
  }
}
