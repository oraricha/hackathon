import React, {Component, PropTypes} from 'react';

export default class NumberFormatter extends Component {
  static propTypes = {
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    format: PropTypes.string
  }

  formatNumber() {
    const number = +(this.props.number);
    if (number >= 1000000000) {
      return (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (number >= 1000) {
      return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return number;
  }

  render() {
    const formattedNumber = this.formatNumber();
    return (
        <span>{formattedNumber}</span>
    );
  }
}
