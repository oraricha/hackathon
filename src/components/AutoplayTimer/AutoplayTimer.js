/**
 * Created by oriavraham on 07/11/2016.
 */
import React, {Component, PropTypes} from 'react';
import VisibilitySensor from 'react-visibility-sensor';

class AutoplayTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animateTimer: true,
      animationEnded: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.active) {
      setTimeout(() => {
        this.setState({
          animateTimer: true,
          animationEnded: false,
        });
      }, 500);
    }
  }

  complete(callback) {
    this.setState({
      animateTimer: false,
      animationEnded: true,
    });
    setTimeout(callback, 200);
  }

  toggleTimer(flag) {
    this.setState({
      animateTimer: flag,
    });
  }

  render() {
    const {active, completeCallback} = this.props;   // eslint-disable-line
    const styles = require('./AutoplayTimer.scss');
    const animate = this.state.animateTimer && active ? styles.doAnimation : '';
    const bump = this.state.animationEnded ? styles.bump : '';
    return (
        <VisibilitySensor onChange={isVisible => {
          this.toggleTimer(isVisible);
        }}>
          <div className={`${styles.container} ${animate} ${bump}`}
               onClick={() => {
                 this.complete(completeCallback);
               }}>
            <div className={styles.mask}
                 onAnimationEnd={() => {
                   this.complete(completeCallback);
                 }}>
              <div/>
            </div>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              color: 'white',
              fontSize: '24px'
            }} className="ic icon-arrow-right"/>
          </div>
        </VisibilitySensor>
    );
  }
}

AutoplayTimer.propTypes = {
  interval: PropTypes.number,
  duration: PropTypes.number.isRequired,
  timeRemaining: PropTypes.number,
  completeCallback: PropTypes.func,
  active: PropTypes.bool.isRequired,
};
AutoplayTimer.defaultProps = {
  interval: 10,
  completeCallback: () => {
  }
};

export default AutoplayTimer;
