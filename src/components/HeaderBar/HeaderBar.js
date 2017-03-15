import React, {PropTypes} from 'react';
import {Link} from 'react-router';
const styles = require('./HeaderBar.scss');
const headers = ['publishers', 'advertisers', 'about'];

function trafficOut(dispatch, header) {
  const eventAction = header.charAt(0).toUpperCase() + header.slice(1);
  dispatch({
    type: 'ANALYTICS_EVENT',
    payload: {
      eventCategory: 'Top Bar',
      eventAction: `${eventAction}`,
      eventLabel: ''
    }
  });
}

function getHeaderItems(dispatch, currentHeader) {
  // handleLinkClick
  function handleLinkClick(header) {
    trafficOut(dispatch, header);
  }
  // generate header items
  const items = headers.map((relatedHeader, index) => {
    const selectedStyle = (currentHeader === relatedHeader) ? styles.selected : {};
    const key = `${relatedHeader + index}`;
    return (
      <div className={styles['related-list']} key={key}>
        <div className={styles[`${relatedHeader}`]}>
          <Link onClick={() => {handleLinkClick(relatedHeader);}} target={''} to={`/${relatedHeader}`}>
            <dl className={selectedStyle}>{relatedHeader}</dl>
          </Link>
        </div>
      </div>
    );
  });
  return (
    <div className={styles.headers}>{items}</div>
  );
}

const HeaderBar = (props) => {
  const {dispatch, currentHeader} = props;
  const content = getHeaderItems(dispatch, currentHeader);
  return (
    <div className={styles.container}>{content}</div>
  );
};

HeaderBar .propTypes = {
  headers: PropTypes.array,
  dispatch: PropTypes.func,
  currentHeader: PropTypes.string,
};

export default HeaderBar;
