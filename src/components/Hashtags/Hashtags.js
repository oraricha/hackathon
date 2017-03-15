import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Text} from 'rebass';

const MAX_HASHTAGS_NUMBER = 5;

const Hashtags = (props) => {
  const {children, disabled} = props; // eslint-disable-line no-shadow
  let {tags} = props;
  tags = tags || [];
  const styles = require('./Hashtags.scss');
  let keyCount = 0;
  const hashTags = tags.slice(0, MAX_HASHTAGS_NUMBER).map(item => {
    const encodedHashTag = encodeURIComponent(item);
    return (
      <Text key={keyCount++} style={{display: 'inline'}}>
        {disabled ? <span className={styles.static}>{item}&nbsp;</span>
          :
        <Link to={`/tags/${encodedHashTag}`}
              className={styles.link}
              onClick={(event) => {
                event.stopPropagation();
              }}>#{item}&nbsp;</Link>
        }
      </Text>
    );
  });
  return (
    <div>
      {(() => {
        if (tags.length > 0 && children) {
          return (
            <div style={{display: 'inline-block', marginRight: '8px'}}>
              {children}
            </div>
          );
        }
      })()}
      <div style={{display: 'inline'}} className={styles.container}>
        {hashTags}
      </div>
    </div>
  );
};

Hashtags.propTypes = {
  tags: PropTypes.array,
  disabled: PropTypes.bool,
  children: PropTypes.element
};

Hashtags.defaultProps = {
  disabled: false,
};

export default Hashtags;
