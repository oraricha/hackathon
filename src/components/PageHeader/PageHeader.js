import React, {Component, PropTypes} from 'react';
import {MediaObject, NumberFormatter, ShareButton} from 'components';
import { Link } from 'react-router';
const styles = require('./PageHeader.scss');

export default class PageHeader extends Component {
  static propTypes = {
    imgSrc: PropTypes.string,
    bgImg: PropTypes.string,
    pageHeader: PropTypes.string,
    pageType: PropTypes.oneOf(['tag', 'channel', 'conversation']),
    channelLink: PropTypes.string,
    handleClickOnChannelURL: PropTypes.func,
    statList: PropTypes.object,
    related: PropTypes.array,
    shareMessages: PropTypes.object,
    avatar: PropTypes.string,
    fbImg: PropTypes.string,
    toggleShareMenu: PropTypes.func,
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  getHeaderStatistics() {
    const {statList} = this.props;
    const statListKeys = statList ? Object.keys(statList) : [];

    if (!statListKeys.length) {
      return '';
    }
    let counter = 0;
    const statLisItems = statListKeys.map(statisticItemKey => {
      return (
        <li key={counter++} className={styles['stat-item']}>
          <div className={styles['stat-value']}>
            <NumberFormatter number={this.props.statList[statisticItemKey]}/>
          </div>
          <div className={styles['stat-name']}>{statisticItemKey}</div>
        </li>
      );
    });
    return statLisItems;
  }

  /**
   * Converts related items object to a list of media objects
   * expects an array-like object , the key is the string for the media body, and the value is the image of the media, e.g:
   * const relatedTags = {
      'TelegraphPolitics': 'http://image.flaticon.com/icons/svg/197/197484.svg'
     };
   passing in an image for each media object is optional
   **/
  getRelatedItems() {
    const {related, pageType} = this.props;
    const buildRelatedByType = {
      tag: (relatedTags) => {
        const relatedSliced = relatedTags.slice(0, 6);
        return relatedSliced.map((relatedItem, index) => {
          return (
            <li key={index} className={styles['flag-related']}>
              <Link to={`/tags/${relatedItem}`}>
                #{relatedItem}
              </Link>
            </li>
          );
        });
      },
      conversation: (relatedTags) => {
        const relatedSliced = relatedTags.slice(0, 6);
        return relatedSliced.map((relatedItem, index) => {
          return (
            <li key={index} className={styles['flag-related']}>
              <Link to={`/tags/${relatedItem}`}>
                #{relatedItem}
              </Link>
            </li>
          );
        });
      },
      channel: (relatedChannels) => {
        const relatedSliced = relatedChannels.slice(0, 6);
        return relatedSliced.map((relatedItem, index) => {
          return (
            <li key={index} className={styles['flag-related']}>
              <Link to={`/channel/${relatedItem.publisherId}`}>
                {relatedItem.name}
              </Link>
            </li>
          );
        });
      }
    };

    return buildRelatedByType[pageType](related);
  }

  getHeaderContentBg(bgImg, isNotChannelPage) {
    const style = {
      background:
        `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)) repeat,
          url(${bgImg})`
    };

    if (isNotChannelPage) {
      style.backgroundSize = `cover, 14vh`;
    }
    return style;
  }

  generateRelatedItmes() {
    const {related, pageType} = this.props;

    // If there are no related return.
    if (!related || !related.length) {
      return '';
    }
    const relatedItems = this.getRelatedItems();
    const prefix = pageType === 'tag' ? <label className={`ic icon-tags ${styles['related-tag-icon']}`} ></label> : '';
    const postFix = pageType === 'conversation' ? '' : <span className={styles['related-channels-prefix']}>See Also</span>;
    return (
      <div className={styles['header-suggestions']}>
        {prefix} {postFix}
      <ul>{relatedItems}</ul>
     </div>);
  }

  render() {
    const {channelLink, pageHeader, pageType, toggleShareMenu, shareMessages, dispatch, handleClickOnChannelURL} = this.props;
    const avatar = this.props.avatar ? this.props.avatar : '';
    const fbImg = this.props.fbImg ? this.props.fbImg : avatar;
    const statisticsItems = this.getHeaderStatistics();
    const isChannelPage = pageType === 'channel';
    const isTaglPage = pageType === 'tag';
    const bgImg = isChannelPage ? avatar : this.props.bgImg;
    const headerContentStyle = this.getHeaderContentBg(bgImg, !isChannelPage);

    return (
      <header className={styles['page-header']}>
        <div className={styles['header-content']} style={headerContentStyle}>
          <div className={styles['header-data']}>
            <MediaObject imgSrc={avatar} flagImageStyle={styles.flag__image}>
              {<div className={styles['header-label']}></div>}
              <h4 className={`${styles['header-title']} ${isTaglPage ? styles['is-tag'] : ''}`}>{pageHeader}</h4>
              {(() => {
                let channelLinkElement = '';
                if (pageType === 'channel' && channelLink) {
                  channelLinkElement =
                   (<a className={styles['channel-link']} href={`http://${channelLink}`} target="_blank"
                   onClick={handleClickOnChannelURL}>
                      {channelLink.replace(/(http|https):\/\/www./g, '').replace(/www./g, '')}
                    </a>);
                }
                return (channelLinkElement);
              })()}
            </MediaObject>
          </div>
          <div className={`${styles['desktop-share-menu']} ${styles['header-meta']}`}>
            <input className={styles['btn-share-toggle-input']} id="btn-share-toggle-input" type="checkbox" />
            <label htmlFor="btn-share-toggle-input" className={`ic icon- ${styles['btn-share-toggle']}`} />
            <ul className={`${styles['share-menu']}`}>
              <li>
                <ShareButton type="facebook" className={styles['share-btn']} fbImg={fbImg} {...shareMessages} dispatch={dispatch}/>
              </li>
              <li>
                <ShareButton type="twitter" className={styles['share-btn']} {...shareMessages} dispatch={dispatch}/>
              </li>
              <li className={styles['mobile-only']}>
                <ShareButton type="whatsapp" className={styles['share-btn']} {...shareMessages} dispatch={dispatch}/>
              </li>
              <li>
                <ShareButton type="link" className={styles['share-btn']} dispatch={dispatch}/>
              </li>
            </ul>
            <ul className={styles['page-stats']}>{statisticsItems}</ul>
          </div>
          <div className={`${styles['material-share-menu']} ${styles['header-meta']}`}>
            <input className={styles['btn-share-toggle-input']} id="btn-share-toggle-input" type="checkbox" />
            <label htmlFor="btn-share-toggle-input" className={`ic icon- ${styles['btn-share-toggle']} toggleShareMenu`} onClick={toggleShareMenu} />
          </div>
        </div>
        {this.generateRelatedItmes()}
      </header>
    );
  }
}
