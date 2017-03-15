import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {
  MediaUnit,
  EmbedPanel,
  AutoplayPanel,
  VideoCommentsContainer,
} from 'components';
import {Grid, Cell} from 'radium-grid';
import * as mediaActions from 'redux/modules/media';
import {load as loadMedia, loadRelated} from 'redux/modules/media';
import {asyncConnect} from 'redux-async-connect';
// import Carousel from 'nuka-carousel';
import {Block} from 'rebass';
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

  render() {
    const styles = require('./Media.scss');
    const {overlay, toggleOverlay, dispatch, media} = this.props;
    // const tags = media ? media.tags : '';
    const {mediaId} = this.props.params;
    const teaser = (media && media.teasers.length > 0) ? media.teasers[0] : undefined;
    const teaserHeight = (teaser && teaser.hasOwnProperty('height')) ? teaser.height : 'inherit';
    const height = media && media.size ? media.size.height : teaserHeight;
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
            <Grid cellWidth="1/1">
              <Cell className={styles.media}>
                <Grid>
                  <Cell cellWidth="1/4"/>
                  <Cell cellWidth="1/2">
                    <MediaUnit dispatch={dispatch} mediaId={mediaId}
                               onDismiss={toggleOverlay}
                               overlay={overlay} height={height}
                               loadingBarActions={loadingBarActions}
                               src={`//renderer.qmerce.com/interaction/${mediaId}?apesterDiscover=true`}>
                      {content}</MediaUnit>
                  </Cell>
                  <Cell cellWidth="1/4"/>
                </Grid>
              </Cell>
              <Cell>
                <Grid>
                  <Cell cellWidth="1/4"/>
                  <Cell cellWidth="1/2">
                    <Block mx={3} my={3}>
                      <VideoCommentsContainer/>
                      {/* <SocialShare disabled={overlay} horizontal {...shareMessages} dispatch={dispatch}/> */}
                    </Block>
                  </Cell>
                  <Cell cellWidth="1/4"/>
                </Grid>
              </Cell>
            </Grid>
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
                  <VideoCommentsContainer/>
                   {/* <SocialShare disabled={overlay} horizontal {...shareMessages} dispatch={dispatch}/> */}
                </Block>
              </Cell>
            </Grid>
          </div>
        </div>
    );
  }
}
export default Media;
