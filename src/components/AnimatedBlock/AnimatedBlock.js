import React, {Component, PropTypes} from 'react';
import Radium from 'radium';

@Radium
class AnimatedBlock extends Component {
  render() {
    const {name, endCallBack, delay, duration, ease, animation, children, count, active} = this.props;
    const keyframes = Radium.keyframes(animation, name);
    const styles = {
      inner: {
        animation: `x ${duration}s ${ease} ${delay}ms ${count}`,
        animationName: keyframes,
        animationFillMode: 'forwards',
        // animationPlayState: active ? 'initial' : 'running',
      }
    };
    const innerStyle = active ? [styles.inner, animation['0%']] : {}; // todo we must use a dummy node here so the keyframes would get calculated on first pass.
    return (
        <div>
          <div style={[styles.inner, {display: 'none'}]}></div>
          <div onAnimationEnd={() => {
            if (active) {
              endCallBack();
            }
          }} style={innerStyle}>{children}</div>
        </div>
    );
  }
}

AnimatedBlock.propTypes = {
  active: PropTypes.bool,
  endCallBack: PropTypes.func,
  delay: PropTypes.number,
  duration: PropTypes.number,
  ease: PropTypes.string,
  name: PropTypes.string,
  animation: PropTypes.object,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
};
AnimatedBlock.defaultProps = {
  active: false,
  duration: 0.5,
  delay: 0,
  ease: 'ease',
  animation: {},
  count: '1',
  endCallBack: () => {
  },
};

export default AnimatedBlock;

