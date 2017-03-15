import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {
    MediaSnippet,
    MediaUnit,
    RelatedTile,
    SocialShare,
    Hashtags,
    EmbedPanel,
    AutoplayPanel,
    Box
} from 'components';
import {Grid, Cell} from 'radium-grid';
import * as mediaActions from 'redux/modules/media';
import {load as loadMedia, loadRelated} from 'redux/modules/media';
import {asyncConnect} from 'redux-async-connect';
import Carousel from 'nuka-carousel';
import {Block, Heading} from 'rebass';
import {push} from 'react-router-redux';
import {generateImageUrl} from '../../helpers/prefixes';
import {stripHtmlTags} from '../../helpers/utils';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

@asyncConnect([{
  promise: ({store: {dispatch}, params}) => {
    return dispatch(loadMedia(params.mediaId));
  }
}])
@connect(
    state => ({
      media: state.media.media,
      related: state.media.related,
      overlay: state.media.overlay,
      autoplay: state.media.autoplay,
    }),
    {...mediaActions, showLoading, hideLoading})

class Media extends Component {
  static propTypes = {
    media: PropTypes.object,
    related: PropTypes.array,
    load: PropTypes.func,
    dispatch: PropTypes.func,
    toggleOverlay: PropTypes.func,
    openAutoplay: PropTypes.func,
    openEmbed: PropTypes.func,
    params: PropTypes.object,
    tags: PropTypes.array,
    overlay: PropTypes.bool,
    autoplay: PropTypes.bool,
  };

  componentDidMount() {
    const {dispatch, params} = this.props;
    dispatch(loadRelated(params.mediaId));
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));     // TODO remove ugly hack
    }, 100);

    window.addEventListener('message', this.iframeMessageEvent.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.iframeMessageEvent.bind(this), false);
  }

  getLoadingBarActions() {
    const {dispatch} = this.props;
    return {
      showLoading: () => {dispatch(showLoading());},
      hideLoading: () => {dispatch(hideLoading());},
    };
  }

  getShareMessages(media) {
    const teaser = (media && media.teasers.length > 0) ? media.teasers[0] : undefined;
    const teaserTitleValue = (teaser && teaser.hasOwnProperty('title')) ? teaser.title.value : '';
    const teaserImage = (teaser && teaser.hasOwnProperty('image')) ? (teaser.image) : '';
    const teaserImageBackgrounds = (teaserImage && teaserImage.hasOwnProperty('background')) ? (teaser.image.background) : '';
    const teaserImageBackgroundsImage = (teaserImageBackgrounds && teaserImageBackgrounds.length > 0) ? teaserImageBackgrounds[0] : undefined;
    const teaserImageBackgroundImage = (teaserImageBackgroundsImage && teaserImageBackgroundsImage.hasOwnProperty('image')) ? teaserImageBackgroundsImage.image : '';
    return {
      whatsappMsg: stripHtmlTags(teaserTitleValue) + '. Your turn!',
      fbImg: generateImageUrl(teaserImageBackgroundImage),
      fbTitle: 'Apester Discover',
      fbDescription: stripHtmlTags(teaserTitleValue) + '. Your turn!',
      twitterMsg: stripHtmlTags(teaserTitleValue) + '. Your turn!',
    };
  }

  getRelated() {
    const {related} = this.props;
    return related || [];
  }

  getOverlayContent() {
    const {overlay, toggleOverlay, autoplay, dispatch} = this.props;
    const {mediaId} = this.props.params;
    const related = this.getRelated();
    const nextMedia = related[0];
    //  const prevMedia = related[related.length - 1]; // todo out of bounds?
    const content = autoplay ? (
        <AutoplayPanel media={nextMedia} completeCallback={() => {
          dispatch(push(`/media/${nextMedia.interactionId}`));
        }} cancelCallback={toggleOverlay} active={overlay}/>) : (
        <EmbedPanel mediaId={mediaId} copiedCallback={toggleOverlay}/>);
    return content;
  }

  iframeMessageEvent(event) {
    if (event) {
      if (event.origin === 'http://renderer.qmerce.com') {
        const data = event.data || {};
        if (data.type
            === 'unit_complete'
            || data.type
               === 'unit_engaged') { // todo smarter handling
          setTimeout(() => {
            this.props.dispatch(this.props.openAutoplay());
          }, 6000);
        }
      }
    }
  }

  createRelated() {
    const related = this.getRelated();
    return related.slice(0, related.length).map(item => {
      return (
          <RelatedTile key={item.interactionId} {...item}/>
      );
    });
  }

  createMobileRelated() {
    const {related} = this.props;
    if (related) {
      // mobile gap style
      const mobileGridStyle = {padding: '6px 0 9px'};
      const mobileCellStyle = {margin: '0 0 6px 0'};
      // mobile box style
      const boxRightPadding = {padding: '0 3px 0 0'};
      const boxMiddlePadding = {padding: '0 1.5px'};
      const boxLeftPadding = {padding: '0 0 0 3px'};
      return (
          <Block my={0}>
            <Block px={2} py={2} mb={0} style={
              {
                background: 'rgba(0,0,0,0.70)',
              }}>
              <Heading level={3} size={2}
                       style={{fontSize: '16px', color: 'rgba(75,75,75,1)'}}>
                More Highlights
              </Heading>
            </Block>
            <Grid
                gutter="0px"
                cellWidth="1"
                style={mobileGridStyle}>
              <Cell smallWidth="1/1" style={mobileCellStyle}>
                <Grid gutter="6px">
                  <Box
                      cellWidth="1/3"
                      type="small"
                      ratio={0.5}
                      style={boxLeftPadding}
                      model={related[0]}/>
                  <Box
                      cellWidth="2/3"
                      ratio={1}
                      style={boxRightPadding}
                      model={related[1]}/>
                </Grid>
              </Cell>
              <Cell smallWidth="1/1" style={mobileCellStyle}>
                <Grid gutter="6px">
                  <Box
                      cellWidth="2/3"
                      ratio={1}
                      style={boxLeftPadding}
                      model={related[2]}/>
                  <Box
                      type="small"
                      cellWidth="1/3"
                      ratio={0.5}
                      style={boxRightPadding}
                      model={related[3]}/>
                </Grid>
              </Cell>
              <Cell smallWidth="1/1" style={mobileCellStyle}>
                <Grid gutter="6px">
                  <Box
                      type="small"
                      cellWidth="1/3"
                      ratio={0.5}
                      style={boxLeftPadding}
                      model={related[4]}/>
                  <Box
                      cellWidth="2/3"
                      ratio={1}
                      style={boxRightPadding}
                      model={related[5]}/>
                </Grid>
              </Cell>
              <Cell smallWidth="1/1" style={mobileCellStyle}>
                <Grid gutter="6px">
                  <Box
                      type="small"
                      cellWidth="1/3"
                      ratio={0.5}
                      style={boxLeftPadding}
                      model={related[6]}/>
                  <Box
                      type="small"
                      cellWidth="1/3"
                      ratio={0.5}
                      style={boxMiddlePadding}
                      model={related[7]}/>
                  <Box
                      type="small"
                      cellWidth="1/3"
                      ratio={0.5}
                      style={boxRightPadding}
                      model={related[8]}/>
                </Grid>
              </Cell>
              <Cell smallWidth="1/1" style={mobileCellStyle}>
                <Grid gutter="6px">
                  <Box
                      cellWidth="2/3"
                      ratio={1}
                      style={boxLeftPadding}
                      model={related[9]}/>
                  <Box
                      type="small"
                      cellWidth="1/3"
                      ratio={0.5}
                      style={boxRightPadding}
                      model={related[10]}/>
                </Grid>
              </Cell>
            </Grid>
          </Block>
      );
    }
  }

  handleNext(event) {
    event.preventDefault();
    // ref="carousel" so :
    this.refs.carousel.nextSlide();
  }

  handlePrevious(event) {
    event.preventDefault();
    this.refs.carousel.previousSlide();
  }

  trafficOut() {
    const {params} = this.props;
    this.props.dispatch(
      {
        type: 'ANALYTICS_EVENT',
        payload: {
          eventCategory: 'Traffic out',
          eventAction: 'Media Link clicked',
          eventLabel: `${params.mediaId}`
        }
      }
    );
  }

  render() {
    const styles = require('./Media.scss');
    const {overlay, toggleOverlay, openEmbed, dispatch, media} = this.props;
    const tags = media ? media.tags : '';
    const {mediaId} = this.props.params;
    const teaser = (media && media.teasers.length > 0) ? media.teasers[0] : undefined;
    const teaserHeight = (teaser && teaser.hasOwnProperty('height')) ? teaser.height : 'inherit';
    const height = media && media.size ? media.size.height : teaserHeight;
    const relatedElements = this.createRelated();
    const relatedElementsMobile = this.createMobileRelated();
    const content = this.getOverlayContent();
    const shareMessages = this.getShareMessages(media);
    const {fbImg} = shareMessages;
    const pageDescription = teaser ? stripHtmlTags(teaser.title.value) + '. Your turn!' : '';
    const loadingBarActions = this.getLoadingBarActions();
    return (
      <div>
        {/* NOTE: *DO NOT* remove the empty title attribute from Helmet - it is needed to make sure the title only contains 'Apester Discover:' */}
        <Helmet title=""
                meta={[
                  {name: 'description', content: pageDescription},
                  {property: 'og:description', content: pageDescription},
                  {property: 'og:image', content: fbImg}
                ]}/>
          <div className={styles.lg}>
            <Block pt={4}>
              <Grid width="1/4" style={{justifyContent: 'center'}}>
                <Cell align="right" className={styles.share}
                      style={{paddingRight: '30px'}}>
                  <SocialShare disabled={overlay} callback={openEmbed} {...shareMessages} dispatch={dispatch}/>
                </Cell>

                <Cell
                    width="1/2"
                    className={styles.media}
                    style={{
                      maxWidth: '600px',
                    }}>
                  <MediaUnit dispatch={dispatch} mediaId={mediaId}
                             onDismiss={toggleOverlay}
                             overlay={overlay} height={height}
                             loadingBarActions={loadingBarActions}
                             src={`//renderer.qmerce.com/interaction/${mediaId}?apesterDiscover=true`}>
                    {content}</MediaUnit>
                </Cell>

                <Cell className={styles.snippet} align="left"
                      style={{paddingLeft: '30px', paddingRight: '30px'}}>
                  <div>
                    <MediaSnippet {...media}
                                  handleClickOnArticleURL={this.trafficOut.bind(this)}/>
                    <Hashtags tags={tags}/>
                  </div>
                </Cell>
              </Grid>
            </Block>
          </div>
          <div className={styles.sm}>
            <Grid cellWidth="1/1">
              <Cell
                  className={styles.media}>
                <MediaUnit dispatch={dispatch} mediaId={mediaId}
                           onDismiss={toggleOverlay}
                           overlay={overlay} height={height}
                           loadingBarActions={loadingBarActions}
                           src={`//renderer.qmerce.com/interaction/${mediaId}?apesterDiscover=true`}>
                  {content}</MediaUnit>
              </Cell>
              <Cell>
                <Block mx={3} my={3}>
                  <MediaSnippet {...media}
                                handleClickOnArticleURL={this.trafficOut.bind(this)}/>
                  <SocialShare disabled={overlay} callback={openEmbed} horizontal {...shareMessages} dispatch={dispatch}/>
                  <Hashtags tags={tags}>
                    <div
                        style={{color: '#636363', width: '12px', height: '12px' }}
                        className="ic icon-tags"/>
                  </Hashtags>
                </Block>
              </Cell>
            </Grid>
          </div>
          {/* todo: figure out how to put it safely into 'cell' */}
          <div className={styles.lg}>
            <Block mt={4} mb={0}>
              <ul className={styles['carousel-nav']}>
                <li>
                  <button
                      className={`ic icon-arrow-left ${styles['carousel-nav-btn']} ${styles['btn-prev']}`}
                      onClick={(evt)=>this.handlePrevious(evt)}>
                  </button>
                </li>
                <li>
                  <button
                      className={`ic icon-arrow-right ${styles['carousel-nav-btn']} ${styles['btn-next']}`}
                      onClick={(evt)=>this.handleNext(evt)}>
                  </button>
                </li>
              </ul>
              <div className={styles['carousel-nav-snippet']}>More Highlights
              </div>
              <div className={styles['carousel-wrapper']}>
                <Carousel
                    dragging={false}
                    cellAlign="left"
                    slidesToShow={5}
                    cellSpacing={6}
                    framePadding="0px"
                    ref="carousel"
                    decorators={[]}>
                  {relatedElements}
                </Carousel>
              </div>
            </Block>
          </div>
          <div className={styles.sm}>
            {relatedElementsMobile}
          </div>
        </div>
    );
  }
}
export default Media;
