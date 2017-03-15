import React, {Component, PropTypes} from 'react';
import GrowingOverlay from '../GrowingOverlay/GrowingOverlay';
import SocialShare from '../SocialShare/SocialShare';
const styles = require('./ShareOverlay.scss');

export default class ShareOverlay extends Component {
  static propTypes = {
    isTagPage: PropTypes.bool,
    pageHeader: PropTypes.string,
    shareMessages: PropTypes.object,
    dispatch: PropTypes.func,
  };

  render() {
    const {pageHeader, shareMessages, dispatch, ...rest} = this.props;
    return (
      <GrowingOverlay {...rest}>
        <h2 className={styles.header}>Share</h2>
        <SocialShare horizontal isColor largeButtons className={styles.list} {...shareMessages} dispatch={dispatch}/>
      </GrowingOverlay>
    );
  }
}

ShareOverlay.defaultProps = {
  open: false,
  onDismiss: () => {
  }
};
