import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import Helmet from 'react-helmet';
import {Box, PageHeader, CustomError, ShareOverlay} from 'components';
import {Grid, Cell} from 'radium-grid';
import {
  load as loadChannel,
  loadChannelProperties,
  loadStatistics,
  toggleGrowingOverlay,
  closeGrowingOverlay,
} from 'redux/modules/channel';
import {generateImageUrl} from '../../helpers/prefixes';
import {push} from 'react-router-redux';
const styles = require('./Channel.scss');

@asyncConnect([{
  promise: ({store: {dispatch}, params}) => {
    return dispatch(loadChannel(params.channelId));
  }
}, {
  promise: ({store: {dispatch}, params}) => {
    return dispatch(loadChannelProperties(params.channelId));
  }
}])

@connect(
  state => ({
    channel: state.channel.channel,
    relatedChannels: state.channel.relatedChannels,
    channelProps: state.channel.channelProps,
    channelStatistics: state.channel.channelStatistics,
    error: state.channel.error,
    isOverlayVisible: state.channel.isOverlayVisible,
    hasOverlayOpenedOnce: state.channel.hasOverlayOpenedOnce,
  })
  , {pushState: push, toggleGrowingOverlay, closeGrowingOverlay})

class Channel extends Component {
  static propTypes = {
    params: PropTypes.object,
    channel: PropTypes.object,
    error: PropTypes.object,
    pushState: PropTypes.func,
    toggleGrowingOverlay: PropTypes.func,
    isOverlayVisible: PropTypes.bool,
    hasOverlayOpenedOnce: PropTypes.bool,
    dispatch: PropTypes.func,
    closeGrowingOverlay: PropTypes.func,
  };

  componentWillMount() {
    const {error, pushState} = this.props;
    if (error) {
      pushState('/404');
    }
  }

  componentDidMount() {
    const {dispatch, params} = this.props;
    dispatch(loadStatistics(params.channelId));
  }

  componentWillUnmount() {
    this.props.closeGrowingOverlay();
  }

  getDesktopChannels(tilesArray) {
    // desktop gap style
    const desktopGridStyle = {padding: '10px 10px 0 10px'};
    const desktopCellStyle = {margin: '0 0 10px 0'};
    // desktop box style
    const boxRightPadding = {padding: '0 5px 0 0'};
    const boxMiddlePadding = {padding: '0 5px'};
    const boxLeftPadding = {padding: '0 0 0 5px'};
    // grid breakpoints
    const breakpoints = {
      small: '@media only screen and (max-width: 600px)',
      medium: '@media only screen and (min-width: 600px) and (max-width:'
      + ' 960px)',
      large: '@media only screen and (min-width: 960px) and (max-width:'
      + ' 1600px)',
      xlarge: '@media only screen and (min-width: 1600px)'
    };
    return (
      <Grid
        breakpoints={breakpoints}
        gutter="0px"
        cellWidth="1/1"
        style={desktopGridStyle}>
        <Cell smallWidth="1/1" style={desktopCellStyle}>
          <Grid gutter="0px">
            <Box hidePublisher
                 fontStyle={{
                   fontFamily: 'Lora',
                 }}
                 style={boxRightPadding}
                 cellWidth="1/4"
                 smallWidth="1/1"
                 type="small"
                 ratio={1}
                 model={tilesArray[0]}/>
            <Box hidePublisher
                 cellWidth="1/2"
                 smallWidth="1/1"
                 ratio={2}
                 style={boxMiddlePadding}
                 model={tilesArray[1]}/>
            <Box hidePublisher
                 fontStyle={{
                   fontFamily: 'Lora',
                   fontStyle: 'italic',
                   fontWeight: '200!important'
                 }}
                 style={boxLeftPadding}
                 cellWidth="1/4"
                 smallWidth="1/1"
                 type="small"
                 ratio={1}
                 model={tilesArray[2]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={desktopCellStyle}>
          <Grid gutter="0px">
            <Box hidePublisher
                 cellWidth="1/4"
                 smallWidth="1/1"
                 type="small"
                 ratio={1}
                 style={boxRightPadding}
                 model={tilesArray[3]}/>
            <Box hidePublisher
                 fontStyle={{
                   fontFamily: 'Lora',
                   fontStyle: 'italic',
                   fontWeight: '200!important'
                 }}
                 style={boxMiddlePadding}
                 cellWidth="1/2"
                 smallWidth="1/1"
                 ratio={2}
                 model={tilesArray[4]}/>
            <Box hidePublisher
                 fontStyle={{
                   fontFamily: 'Lora',
                 }}
                 style={boxLeftPadding}
                 cellWidth="1/4"
                 type="small"
                 smallWidth="1/1"
                 ratio={1}
                 model={tilesArray[5]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={desktopCellStyle}>
          <Grid gutter="0px">
            <Box hidePublisher
                 cellWidth="1/4"
                 xlargeWidth="1/4"
                 smallWidth="1/1"
                 type="small"
                 ratio={1}
                 paddingX={4}
                 paddingRatio={1}
                 style={boxRightPadding}
                 model={tilesArray[6]}/>
            <Box hidePublisher
                 cellWidth="1/4"
                 smallWidth="1/1"
                 type="small"
                 ratio={1}

                 style={boxMiddlePadding}
                 model={tilesArray[7]}/>
            <Box hidePublisher
                 cellWidth="1/2"
                 smallWidth="1/1"
                 ratio={2}
                 style={boxLeftPadding}
                 model={tilesArray[8]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={desktopCellStyle}>
          <Grid gutter="0px">
            <Box hidePublisher
                 fontStyle={{
                   fontFamily: 'Lora',
                 }}
                 style={boxRightPadding}
                 cellWidth="1/4"
                 smallWidth="1/1"
                 type="small"
                 ratio={1}
                 model={tilesArray[9]}/>
            <Box
              hidePublisher
              cellWidth="1/2"
              smallWidth="1/1"
              ratio={2}
              style={boxMiddlePadding}
              model={tilesArray[10]}/>
            <Box hidePublisher
                 fontStyle={{
                   fontFamily: 'Lora',
                   fontStyle: 'italic',
                   fontWeight: '200!important'
                 }}
                 style={boxLeftPadding}
                 cellWidth="1/4"
                 smallWidth="1/1"
                 type="small"
                 ratio={1}
                 model={tilesArray[11]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={desktopCellStyle}>
          <Grid gutter="0px">
            <Box hidePublisher
                 cellWidth="1/4"
                 smallWidth="1/1"
                 type="small"
                 ratio={1}
                 style={boxRightPadding}
                 model={tilesArray[12]}/>
            <Box hidePublisher
                 fontStyle={{
                   fontFamily: 'Lora',
                   fontStyle: 'italic',
                   fontWeight: '200!important'
                 }}
                 style={boxMiddlePadding}
                 cellWidth="1/2"
                 smallWidth="1/1"
                 ratio={2}
                 model={tilesArray[13]}/>
            <Box hidePublisher
                 fontStyle={{
                   fontFamily: 'Lora',
                 }}
                 style={boxLeftPadding}
                 cellWidth="1/4"
                 type="small"
                 smallWidth="1/1"
                 ratio={1}
                 model={tilesArray[14]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={desktopCellStyle}>
          <Grid gutter="0px">
            <Box hidePublisher
                 cellWidth="1/4"
                 xlargeWidth="1/4"
                 smallWidth="1/1"
                 type="small"
                 ratio={1}
                 fontStyle={{
                   fontFamily: 'Lora',
                 }}
                 style={boxRightPadding}
                 model={tilesArray[15]}/>
            <Box hidePublisher
                 cellWidth="1/4"
                 smallWidth="1/1"
                 type="small"
                 ratio={1}
                 style={boxMiddlePadding}
                 model={tilesArray[16]}/>
            <Box hidePublisher
                 cellWidth="1/2"
                 smallWidth="1/1"
                 ratio={2}
                 style={boxLeftPadding}
                 model={tilesArray[17]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={desktopCellStyle}>
          <Grid gutter="0px">
            <Box hidePublisher
                 fontStyle={{
                   fontFamily: 'Lora',
                 }}
                 style={boxRightPadding}
                 cellWidth="1/4"
                 smallWidth="1/1"
                 type="small"
                 ratio={1}
                 model={tilesArray[18]}/>
            <Box hidePublisher
                 cellWidth="1/2"
                 smallWidth="1/1"
                 ratio={2}
                 style={boxMiddlePadding}
                 model={tilesArray[19]}/>
            <Box hidePublisher
                 cellWidth="1/4"
                 smallWidth="1/1"
                 ratio={1}
                 style={boxLeftPadding}
                 model={tilesArray[20]}/>
          </Grid>
        </Cell>
      </Grid>
    );
  }

  getMobileChannels(tilesArray) {
    // mobile gap style
    const mobileGridStyle = {padding: '10px 0'};
    const mobileCellStyle = {margin: '0 0 6px 0'};
    // mobile box style
    const boxRightPadding = {padding: '0 3px 0 0'};
    const boxMiddlePadding = {padding: '0 3px'};
    const boxLeftPadding = {padding: '0 0 0 3px'};
    return (
      <Grid
        gutter="0px"
        cellWidth="1"
        style={mobileGridStyle}>
        <Cell smallWidth="1/1" style={mobileCellStyle}>
          <Grid gutter="0px">
            <Box
              fontStyle={{
                fontFamily: 'Lora',
                fontStyle: 'italic',
                fontWeight: '200!important',
                lineHeight: 1.2
              }}
              type="small"
              style={boxRightPadding}
              smallWidth="1/3"
              ratio={0.5}
              paddingX={3}
              paddingRatio={1}
              model={tilesArray[0]}/>
            <Cell
              smallWidth="2/3">
              <Grid gutter="0px">
                <Box
                  style={boxLeftPadding}
                  smallWidth="1/1"
                  ratio={1}
                  model={tilesArray[1]}/>
              </Grid>
            </Cell>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={mobileCellStyle}>
          <Grid gutter="0px">
            <Box
              fontStyle={{
                fontFamily: 'Lora',
              }}
              style={boxRightPadding}
              smallWidth="2/3"
              ratio={1}
              model={tilesArray[2]}/>
            <Box
              fontStyle={{
                lineHeight: 1.2
              }}
              smallWidth="1/3"
              style={boxLeftPadding}
              ratio={0.5}
              paddingX={3}
              paddingRatio={1}
              model={tilesArray[3]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={mobileCellStyle}>
          <Grid gutter="0px">
            <Box
              fontStyle={{
                fontFamily: 'Lora',
                fontStyle: 'italic',
                fontWeight: '200!important',
                lineHeight: 1.2
              }}
              type="small"
              style={boxRightPadding}
              smallWidth="1/3"
              ratio={0.5}
              paddingX={3}
              paddingRatio={1}
              model={tilesArray[4]}/>
            <Cell
              smallWidth="2/3">
              <Grid gutter="0px">
                <Box
                  style={boxLeftPadding}
                  smallWidth="1/1"
                  ratio={1}
                  model={tilesArray[5]}/>
              </Grid>
            </Cell>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={mobileCellStyle}>
          <Grid gutter="0px">
            <Box
              fontStyle={{
                fontFamily: 'Lora',
                fontStyle: 'italic',
                fontWeight: '200!important',
                lineHeight: 1.2
              }}
              style={boxRightPadding}
              ratio={0.5}
              model={tilesArray[6]}/>
            <Box
              style={boxMiddlePadding}
              ratio={0.5}
              paddingX={3}
              paddingRatio={2}
              model={tilesArray[7]}/>
            <Box
              fontStyle={{
                fontFamily: 'Lora',
                fontStyle: 'italic',
                fontWeight: '200!important',
                lineHeight: 1.2
              }}
              style={boxLeftPadding}
              ratio={0.5}
              model={tilesArray[8]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={mobileCellStyle}>
          <Grid gutter="0px">
            <Box
              fontStyle={{
                fontFamily: 'Lora',
              }}
              style={boxRightPadding}
              smallWidth="2/3"
              ratio={1}
              model={tilesArray[9]}/>
            <Box
              fontStyle={{
                lineHeight: 1.2
              }}
              smallWidth="1/3"
              style={boxLeftPadding}
              ratio={0.5}
              paddingX={3}
              paddingRatio={1}
              model={tilesArray[10]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={mobileCellStyle}>
          <Grid gutter="0px">
            <Box
              fontStyle={{
                fontFamily: 'Lora',
                fontStyle: 'italic',
                fontWeight: '200!important',
                lineHeight: 1.2
              }}
              type="small"
              style={boxRightPadding}
              smallWidth="1/3"
              ratio={0.5}
              paddingX={3}
              paddingRatio={1}
              model={tilesArray[11]}/>
            <Cell
              smallWidth="2/3">
              <Grid gutter="0px">
                <Box
                  style={boxLeftPadding}
                  smallWidth="1/1"
                  ratio={1}
                  model={tilesArray[12]}/>
              </Grid>
            </Cell>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={mobileCellStyle}>
          <Grid gutter="0px">
            <Box
              fontStyle={{
                fontFamily: 'Lora',
              }}
              style={boxRightPadding}
              smallWidth="2/3"
              ratio={1}
              model={tilesArray[13]}/>
            <Box
              fontStyle={{
                lineHeight: 1.2
              }}
              smallWidth="1/3"
              style={boxLeftPadding}
              ratio={0.5}
              paddingX={3}
              paddingRatio={1}
              model={tilesArray[14]}/></Grid></Cell>
        <Cell smallWidth="1/1" style={mobileCellStyle}>
          <Grid gutter="0px">
            <Box
              fontStyle={{
                fontFamily: 'Lora',
                fontStyle: 'italic',
                fontWeight: '200!important',
                lineHeight: 1.2
              }}
              type="small"
              style={boxRightPadding}
              smallWidth="1/3"
              ratio={0.5}
              paddingX={3}
              paddingRatio={1}
              model={tilesArray[15]}/>
            <Cell
              smallWidth="2/3">
              <Grid gutter="0px">
                <Box
                  style={boxLeftPadding}
                  smallWidth="1/1"
                  ratio={1}
                  model={tilesArray[16]}/>
              </Grid>
            </Cell>
          </Grid></Cell>
        <Cell smallWidth="1/1" style={mobileCellStyle}>
          <Grid gutter="0px">
            <Box
              fontStyle={{
                fontFamily: 'Lora',
                fontStyle: 'italic',
                fontWeight: '200!important',
                lineHeight: 1.2
              }}
              style={boxRightPadding}
              ratio={0.5}
              model={tilesArray[17]}/>
            <Box
              style={boxMiddlePadding}
              ratio={0.5}
              paddingX={3}
              paddingRatio={2}
              model={tilesArray[18]}/>
            <Box
              fontStyle={{
                fontFamily: 'Lora',
                fontStyle: 'italic',
                fontWeight: '200!important',
                lineHeight: 1.2
              }}
              style={boxLeftPadding}
              ratio={0.5}
              model={tilesArray[19]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={mobileCellStyle}>
          <Grid gutter="0px">
            <Box
              fontStyle={{
                fontFamily: 'Lora',
              }}
              style={boxRightPadding}
              smallWidth="2/3"
              ratio={1}
              model={tilesArray[20]}/>
            <Box
              fontStyle={{
                lineHeight: 1.2
              }}
              smallWidth="1/3"
              style={boxLeftPadding}
              ratio={0.5}
              paddingX={3}
              paddingRatio={1}
              model={tilesArray[21]}/>
          </Grid>
        </Cell>
      </Grid>
    );
  }

  getShareMessages(pageHeader) {
    return {
      fbDescription: `What do you think about ${pageHeader}'s latest news? Want to be a part of the story? Go here.`,
      twitterMsg: `For ${pageHeader}'s latest news Go here.`,
      whatsappMsg: `What do you think about ${pageHeader}'s latest news? Want to be a part of the story? Go here.`,
      mailMsg: `What do you think about ${pageHeader}'s latest news? Want to be a part of the story? Go here.`,
      mailSubject: `Check out this page`
    };
  }
  generateGrid() {
    let {channel} = this.props; // eslint-disable-line
    const tilesArray = channel ? channel.medias : [];
    return (
      <div>
        {/* Desktop Channel Layout */}
        <div className={styles.lg}>
          {this.getDesktopChannels(tilesArray)}
        </div>
        {/* Mobile Channel Layout */}
        <div className={styles.sm}>
          {this.getMobileChannels(tilesArray)}
        </div>
      </div>
    );
  }

  generateNotFound() {
    return (
      <CustomError title="We didn’t find any medias to display :("
                   description="Don’t worry, we have lots of other interesting Stuff!"/>
    );
  }

  trafficOut() {
    const {params, dispatch} = this.props;
    dispatch(
      {
        type: 'ANALYTICS_EVENT',
        payload: {
          eventCategory: 'Traffic out',
          eventAction: 'Channel Link clicked',
          eventLabel: `${params.channelId}`
        }
      }
    );
  }

  render() {
    let {channelProps, channelStatistics, hasOverlayOpenedOnce, dispatch, error, isOverlayVisible, relatedChannels } = this.props; // eslint-disable-line
    if (error) {
      return <div></div>;
    } else {     // eslint-disable-line
      let statList = {};
      if (channelStatistics) {
        statList = {
          'votes': channelStatistics.picked_answer || 0, /* '3500000' */
          'likes': channelStatistics.like || 0, /* '564000' */
          'shares': channelStatistics.clicked_social || 0 /* '120000' */
        };
      }

      const content = error ? this.generateNotFound() :
        this.generateGrid();

      const pageHeader = channelProps ? channelProps.name || 'missing data' : '';
      const channelLink = channelProps ? channelProps.url || 'missing link' : '';
      const pageDescription = `What do you think about ${pageHeader}'s latest news? Want to be a part of the story? Go here.`;
      const pageImage = generateImageUrl(channelProps ? channelProps.profileImage : '');
      const shareMessages = this.getShareMessages(pageHeader);
      return (
        <div className={styles.container}>
          <Helmet title={`${pageHeader}'s channel`}
                  meta={[
                    {name: 'description', content: pageDescription},
                    {property: 'og:description', content: pageDescription},
                    {property: 'og:image', content: pageImage}
                  ]} />
          <ShareOverlay isOverlayVisible={isOverlayVisible} toggle={this.props.toggleGrowingOverlay}
                        hasOverlayOpenedOnce={hasOverlayOpenedOnce} pageHeader={pageHeader} shareMessages={shareMessages}
                        dispatch={dispatch}/>
          <PageHeader statList={statList}
                      pageType="channel"
                      avatar={generateImageUrl(channelProps ? channelProps.profileImage : '')}
                      pageHeader={pageHeader}
                      channelLink={channelLink}
                      handleClickOnChannelURL={this.trafficOut.bind(this)}
                      related={relatedChannels || []}
                      dispatch={dispatch}
                      shareMessages={shareMessages}
                      toggleShareMenu={this.props.toggleGrowingOverlay}
                      isOverlayVisible={isOverlayVisible}/>
          <main className={styles.main}>
            {content}
          </main>
        </div>
      );
    }
  }
}

export default Channel;
