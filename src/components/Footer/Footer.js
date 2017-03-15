import React, {PropTypes} from 'react';
import {Link} from 'react-router';
const styles = require('./Footer.scss');
const links = ['DISCOVER',
               'PUBLISHERS',
               'ADVERTISERS',
               'ABOUT',
               'CAREERS',
               'CONTACT US',
               'HELP CENTER',
               'TERMS OF SERVICE',
               'PRIVACY POLICY'];

function trafficOut(dispatch, eventAction) {
  dispatch({
    type: 'ANALYTICS_EVENT',
    payload: {
      eventCategory: 'Footer',
      eventAction: `${eventAction}`,
      eventLabel: ''
    }
  });
}

function getFooterSection(dispatch) {
  // handleLinkClick
  function handleLinkClick(link) {
    trafficOut(dispatch, link);
  }
  // generate links list
  return (
    <div className={styles.main} style={{maxWidth: '1600px', width: '100%', margin: 'auto', padding: 0}}>
      <div className={styles.linksContainer}>
        <div className={styles.column}>
          <h5 className={styles.header}>APESTER</h5>
          <Link target="_blank" to="http://apester.com/"
                onClick={() => {handleLinkClick(links[0]);}}><h6 className={styles.link}>{links[0]}</h6>
          </Link>
          <Link target="" to="/publishers"
                onClick={() => {handleLinkClick(links[1]);}}><h6 className={styles.link}>{links[1]}</h6>
          </Link>
          <Link target="" to="/advertisers"
                onClick={() => {handleLinkClick(links[2]);}}><h6 className={styles.link}>{links[2]}</h6></Link>
        </div>
        <div className={styles.column}>
          <h5 className={styles.header}>COMPANY</h5>
          <Link target="" to="/about"
                onClick={() => {handleLinkClick(links[3]);}}><h6 className={styles.link}>{links[3]}</h6></Link>
          <Link target="_blank" to="http://jobs.apester.com/"
                onClick={() => {handleLinkClick(links[4]);}}><h6 className={styles.link}>{links[4]}</h6></Link>
          <Link target="" to="/about"
                onClick={() => {handleLinkClick(links[5]);}}><h6 className={styles.contactLink}>{links[5]}</h6></Link>
        </div>
        <div className={styles.column}>
          <h5 className={styles.header}>LEARN MORE</h5>
          <Link target="_blank" to="http://help.apester.com/"
                onClick={() => {handleLinkClick(links[6]);}}><h6 className={styles.link}>{links[6]}</h6></Link>
          <Link target="" to="/terms"
                onClick={() => {handleLinkClick(links[7]);}}><h6 className={styles.link}>{links[7]}</h6></Link>
          <Link target="" to="/privacy"
                onClick={() => {handleLinkClick(links[8]);}}><h6 className={styles.link}>{links[8]}</h6></Link>
        </div>
      </div>
      <div className={styles['social-container']}>
        <Link className={`ic icon-linkedin ${styles.social}`} target="_blank" to="https://www.linkedin.com/company/apester"/>
        <Link className={`ic icon-twitter ${styles.social}`} target="_blank" to=" https://twitter.com/ApesterMag"/>
        <Link className={`ic icon-facebook ${styles.social}`} target="_blank" to="https://www.facebook.com/apester.co"/>
      </div>
    </div>
  );
}

const Footer = (props) => {
  const {dispatch} = props;
  const content = getFooterSection(dispatch);
  return (
    <footer className={styles.footer}>
    {content}
    </footer>
  );
};

Footer.propTypes = {
  dispatch: PropTypes.func,
};

export default Footer;
