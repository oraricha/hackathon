import React, {Component, PropTypes} from 'react';
import copy from 'copy-to-clipboard';
// import config from '../../config';

// TODO: move to a config file (module), the '../../config.js' file has some issues - not working properly
const config = {
  facebookAppId: 1511127292441041,
  facebookRedirectUrl: 'discover.apester.com/',
};

const sharedUrl = () => {
  if (document) {
    // TODO: replace to real ENV instead of hardcoded production, so we can test other ENVs
    return document.location.href.replace(/localhost:(3011|3000)/gi, 'discover.apester.com');
  }
};

const shareClass = {
  twitter: 'twitter',
  facebook: 'facebook',
  whatsapp: 'whatsapp',
  messenger: 'messenger',
  link: 'url',
  embed: 'embed',
  email: 'email',
};

const share = {
  facebook: (self) => {
    const {fbDescription, fbTitle, fbImg} = self.props;
    const params = {
      app_id: config.facebookAppId,
      link: sharedUrl() + '?src=facebook',
      // redirect_uri: 'http://' + config.facebookRedirectUrl + document.referrer,
      description: fbDescription || '',
      name: fbTitle || document.title
    };

    if (fbImg) {
      params.picture = location.protocol.toString() + fbImg;
    }

    window.open('https://www.facebook.com/dialog/feed?' +
      Object.keys(params).map(key => {
        return key + '=' + encodeURIComponent(params[key]);
      }).join('&'));
  },
  twitter: (self) => {
    const TWITTER_TWEET_URL = 'https://twitter.com/share';
    const {twitterMsg, twitterVia} = self.props;
    const message = twitterMsg ? twitterMsg : 'Check this out: ';
    const params = '?url=' + encodeURIComponent(sharedUrl() + '?src=twitter') + '&text=' + encodeURIComponent(message) + ('&via=' + (!!twitterVia ? encodeURIComponent(twitterVia) : 'ApesterMag'));
    const url = TWITTER_TWEET_URL + params;

    window.open(url, 'sharePopup', 'height=400, width=680');
  },
  whatsapp: (self) => {
    const {whatsappMsg} = self.props;
    const url = `whatsapp://send?text=${whatsappMsg} ${encodeURIComponent(sharedUrl() + '?src=whatsapp')}`;
    window.open(url, 'sharePopup', 'height=400, width=680');
  },
  messenger: () => {
    // const {whatsappMsg} = self.props;
    const url = `fb-messenger://share?link=${encodeURIComponent(sharedUrl() + '?src=fbMessenger')}`;
    window.open(url, 'sharePopup', 'height=400, width=680');
  },
  link: () => {
    const url = sharedUrl() + '?src=link';
    // self.showLinkCopiedMsg();
    try {
      copy(url);
    } catch (err) {
      console.warn(err);
    }
  },
  embed: (self) => {
    const {callback} = self.props;
    if (typeof callback === 'function') {
      callback();
    } else {
      console.error('callback property for embed-btn is not a function');
    }
  },
  email: (self) => {
    const {mailMsg, mailSubject} = self.props;
    const url = `mailto:?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailMsg)} ${encodeURIComponent(sharedUrl() + '?src=mail')}`;
    window.location.href = url;
  },
};

export default class ShareButton extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['facebook', 'twitter', 'whatsapp', 'link', 'email', 'embed', 'messenger']).isRequired,
    className: PropTypes.string,
    fbImg: PropTypes.string,
    fbTitle: PropTypes.string,
    fbDescription: PropTypes.string,
    twitterVia: PropTypes.string,
    twitterMsg: PropTypes.string,
    whatsappMsg: PropTypes.string,
    callback: PropTypes.func,
    disabled: PropTypes.bool,
    mailMsg: PropTypes.string,
    mailSubject: PropTypes.string,
    isColor: PropTypes.bool,
    largeButtons: PropTypes.bool,
    children: PropTypes.oneOfType(['node', 'array']),
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    fbTitle: '',
    fbDescription: '',
    twitterVia: 'ApesterMag',
    twitterMsg: '',
    whatsappMsg: '',
    mailMsg: '',
    mailSubject: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLinkCopied: false
    };
  }

  // showLinkCopiedMsg() {
  //   this.setState({
  //     isLinkCopied: true
  //   });
  //   const to = setTimeout(() => {
  //     this.setState({
  //       isLinkCopied: false
  //     });
  //     clearTimeout(to);
  //   }, 3000);
  // }

  handleClick(type) {
    this.props.dispatch({
      type: 'ANALYTICS_EVENT',
      payload: {
        eventCategory: 'social clicked',
        eventAction: type,
        eventLabel: 'no label for social'
      }
    });
    share[type](this);
  }

  render() {
    // () => share[type](this.props)
    const styles = require('./ShareButton.scss');
    const {type, className, children, isColor, largeButtons, disabled} = this.props;
    const disable = disabled && type === 'embed' ?
    {disabled: 'disabled'} : {disabled: ''};
    // this.isLinkCopied = false;
    // this.onClick = () => share[type];
    // ${this.state.isLinkCopied ? styles['is-copied'] : ''}
    return (
      <button
        {...disable}
        className={`${className ? className : ''} ${styles['btn-share']} ic icon-${shareClass[type]}
        ${styles['btn-' + type]} ${isColor ? styles['is-color'] : ''}
        ${largeButtons ? styles.large : ''}`}
              onClick={() => this.handleClick(type)}>
        <span>{type}</span>
        {children}
        {(() => {
          if (type === 'link') {
            return (<span className={`${styles['link-copied']} ic icon-check`}></span>);
          }
        })()}
      </button>
    );
  }
}
