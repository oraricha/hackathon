import React, {PropTypes} from 'react';
import {ShareButton} from 'components';

const SocialShare = (props) => {
  const {horizontal, className, mailMsg, largeButtons, dispatch, ...rest} = props;
  const styles = require('./SocialShare.scss');
  const horizontalClass = horizontal ? styles.horizontal : styles.vertical;
  return (
      <ul className={`${horizontalClass} ${styles.list} ${largeButtons ? styles['large-list'] : ''} ${className}`}>
        <li>
          <ShareButton type="facebook" largeButtons={largeButtons} dispatch={dispatch} {...rest}/>
        </li>
        <li>
          <ShareButton type="twitter" largeButtons={largeButtons} dispatch={dispatch} {...rest}/>
        </li>
        <li className={styles.mobileOnly}>
          <ShareButton type="whatsapp" largeButtons={largeButtons} dispatch={dispatch} {...rest}/>
        </li>
        <li className={styles.desktopOnly}>
          <ShareButton type="link" largeButtons={largeButtons} dispatch={dispatch} {...rest}/>
        </li>
        <li className={styles.mobileOnly}>
          <ShareButton type="messenger" largeButtons={largeButtons} dispatch={dispatch} {...rest}/>
        </li>
        <li className={styles.desktopOnly}>
          <ShareButton type="embed" largeButtons={largeButtons} dispatch={dispatch} {...rest}/>
        </li>
        {(()=> {
          if (mailMsg) {
            return (
              <li>
                <ShareButton type="email" largeButtons={largeButtons} dispatch={dispatch} {...rest}/>
              </li>
            );
          }
        })()}
      </ul>
  );
};

SocialShare.propTypes = {
  horizontal: PropTypes.bool,
  whatsappMsg: PropTypes.string,
  isColor: PropTypes.bool,
  largeButtons: PropTypes.bool,
  className: PropTypes.string,
  mailMsg: PropTypes.string,
  mailSubject: PropTypes.string,
  dispatch: PropTypes.func,
};
SocialShare.defaultProps = {
  horizontal: false,
  className: '',
};

export default SocialShare;
