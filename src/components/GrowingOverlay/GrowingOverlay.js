import React, {Component, PropTypes} from 'react';
import Overlay from '../Overlay/Overlay';
const styles = require('./GrowingOverlay.scss');

export default class GrowingOverlay extends Component {
  static propTypes = {
    isOverlayVisible: PropTypes.bool.isRequired,
    hasOverlayOpenedOnce: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  render() {
    const {isOverlayVisible, toggle, hasOverlayOpenedOnce, children} = this.props;
    return (
      <Overlay verticalAlign="flex-start" width={90} open={isOverlayVisible}
               onDismiss={toggle} isGrowingCircleBg hasOverlayOpenedOnce={hasOverlayOpenedOnce}
               className={styles['growing-overlay']}>
        <div className={styles['overlay-body']}>
          <button onClick={toggle} className={`${styles['btn-close']} ${isOverlayVisible ? styles.open : styles.close}`}>
            <i className="ic icon-cross"></i>
          </button>
          {children}
        </div>
      </Overlay>
    );
  }
}

GrowingOverlay.defaultProps = {
  open: false,
  hasOverlayOpenedOnce: false,
  onDismiss: () => {
  }
};
