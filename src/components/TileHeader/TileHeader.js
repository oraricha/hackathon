import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class TileHeader extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
    font: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element])
  };


  render() {
    const {link, font, children} = this.props;
    const styles = require('./TileHeader.scss');
    return (
        <div className={styles.center}>
          <Link to={'/' + link}>
            <h4 className={`${styles['tile-title']} ${font} tile-title`}>
              <span>{children}</span>
            </h4>
          </Link>
        </div>
    );
  }
}

