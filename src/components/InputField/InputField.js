import React, {Component, PropTypes} from 'react';
export default class InputField extends Component {
  static propTypes = {
    input: PropTypes.object,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    placeholder: PropTypes.string
  };

  render() {
    const {input, children, style, className, placeholder} = this.props;
    return (
        <input
            ref="input"
            value={input.value}
            onChange={input.onChange}
            style={style}
            className={className}
            placeholder={placeholder}
        >
          {children}
        </input>
    );
  }
}
