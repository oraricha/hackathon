import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import Helmet from 'react-helmet';
import {Box, PageHeader, CustomError, ShareOverlay} from 'components';
import {Grid, Cell} from 'radium-grid';
import {
  load as loadConversation,
  loadProps as loadConversationProps,
  toggleGrowingOverlay,
  closeGrowingOverlay,
} from 'redux/modules/conversation';
import {generateImageUrl} from '../../helpers/prefixes';
import {push} from 'react-router-redux';
const styles = require('./Conversation.scss');

@asyncConnect([{
  promise: ({store: {dispatch}, params}) => {
    return dispatch(loadConversationProps(params.conversationName));
  }
}, {
  promise: ({store: {dispatch}, params}) => {
    return dispatch(loadConversation(params.conversationName));
  }
}])

@connect(
  state => ({
    medias: state.conversation.medias,
    conversation: state.conversation.conversation,
    error: state.conversation.error,
    isOverlayVisible: state.conversation.isOverlayVisible,
    hasOverlayOpenedOnce: state.conversation.hasOverlayOpenedOnce,
  })
  , {pushState: push, toggleGrowingOverlay, closeGrowingOverlay})

class Conversation extends Component {
  static propTypes = {
    params: PropTypes.object,
    conversation: PropTypes.object,
    medias: PropTypes.array,
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

  componentWillUnmount() {
    this.props.closeGrowingOverlay();
  }

  getShareMessages(pageHeader) {
    return {
      fbDescription: `What do you think about ${pageHeader}? Want to be a part of the story? Go here.`,
      twitterMsg: `For ${pageHeader}'s latest news Go here.`,
      whatsappMsg: `What do you think about ${pageHeader}' Want to be a part of the story? Go here.`,
      mailMsg: `What do you think about ${pageHeader}? Want to be a part of the story? Go here.`,
      mailSubject: `Check out this page`
    };
  }

  getDesktopTags(tilesArray) {
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
            <Box
              fontStyle={{
                fontFamily: 'Lora',
              }}
              style={boxRightPadding}
              cellWidth="1/4"
              smallWidth="1/1"
              type="small"
              ratio={1}
              model={tilesArray[0]}/>
            <Box
              style={boxMiddlePadding}
              cellWidth="1/2"
              smallWidth="1/1"
              ratio={2}
              model={tilesArray[1]}/>
            <Box
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
            <Box
              style={boxRightPadding}
              cellWidth="1/4"
              smallWidth="1/1"
              type="small"
              ratio={1}
              model={tilesArray[3]}/>
            <Box
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
            <Box
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
            <Box
              style={boxRightPadding}
              cellWidth="1/4"
              xlargeWidth="1/4"
              smallWidth="1/1"
              type="small"
              ratio={1}
              paddingX={4}
              paddingRatio={1}
              model={tilesArray[6]}/>
            <Box
              style={boxMiddlePadding}
              cellWidth="1/4"
              smallWidth="1/1"
              type="small"
              ratio={1}
              paddingX={4}
              paddingRatio={2}
              model={tilesArray[7]}/>
            <Box
              style={boxLeftPadding}
              cellWidth="1/2"
              smallWidth="1/1"
              ratio={2}
              model={tilesArray[8]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={desktopCellStyle}>
          <Grid gutter="0px">
            <Box
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
              style={boxMiddlePadding}
              cellWidth="1/2"
              smallWidth="1/1"
              ratio={2}
              model={tilesArray[10]}/>
            <Box
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
            <Box
              style={boxRightPadding}
              cellWidth="1/4"
              smallWidth="1/1"
              type="small"
              ratio={1}
              model={tilesArray[12]}/>
            <Box
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
            <Box
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
            <Box
              style={boxRightPadding}
              cellWidth="1/4"
              xlargeWidth="1/4"
              smallWidth="1/1"
              type="small"
              ratio={1}
              model={tilesArray[15]}/>
            <Box
              cellWidth="1/4"
              smallWidth="1/1"
              type="small"
              ratio={1}
              style={boxMiddlePadding}
              model={tilesArray[16]}/>
            <Box
              style={boxLeftPadding}
              cellWidth="1/2"
              smallWidth="1/1"
              ratio={2}
              model={tilesArray[17]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={desktopCellStyle}>
          <Grid gutter="0px">
            <Box
              fontStyle={{
                fontFamily: 'Lora',
              }}
              style={boxRightPadding}
              cellWidth="1/4"
              smallWidth="1/1"
              type="small"
              ratio={1}
              model={tilesArray[18]}/>
            <Box
              style={boxMiddlePadding}
              cellWidth="1/2"
              smallWidth="1/1"
              ratio={2}
              model={tilesArray[19]}/>
            <Box
              style={boxLeftPadding}
              cellWidth="1/4"
              smallWidth="1/1"
              ratio={1}
              model={tilesArray[20]}/>
          </Grid>
        </Cell>
      </Grid>
    );
  }
  getMobileTags(tilesArray) {
    // mobile gap style
    const mobileGridStyle = {padding: '6px 6px 0 6px'};
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
              style={boxRightPadding}
              type="small"
              cellWidth="1/3"
              ratio={0.5}
              paddingX={3}
              paddingRatio={1}
              model={tilesArray[0]}/>
            <Box
              cellWidth="2/3"
              ratio={1}
              fontStyle={{
                fontFamily: 'Lora',
                fontStyle: 'italic',
                fontWeight: '200!important',
                lineHeight: 1.2
              }}
              style={boxLeftPadding}
              model={tilesArray[1]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={mobileCellStyle}>
          <Grid gutter="0px">
            <Box
              style={boxRightPadding}
              cellWidth="2/3"
              ratio={1}
              model={tilesArray[2]}/>
            <Box
              style={boxLeftPadding}
              type="small"
              cellWidth="1/3"
              ratio={0.5}
              paddingX={3}
              paddingRatio={1}
              model={tilesArray[3]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={mobileCellStyle}>
          <Grid gutter="0px">
            <Box
              style={boxRightPadding}
              type="small"
              cellWidth="1/3"
              ratio={0.5}
              fontStyle={{
                fontFamily: 'Lora',
                fontStyle: 'italic',
                fontWeight: '200!important',
                lineHeight: 1.2
              }}
              paddingX={3}
              paddingRatio={1}
              model={tilesArray[4]}/>
            <Box
              style={boxLeftPadding}
              cellWidth="2/3"
              ratio={1}
              model={tilesArray[5]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={mobileCellStyle}>
          <Grid gutter="0px">
            <Box
              style={boxRightPadding}
              type="small"
              cellWidth="1/3"
              ratio={0.5}
              fontStyle={{
                fontFamily: 'Lora',
                fontStyle: 'italic',
                fontWeight: '200!important',
                lineHeight: 1.2
              }}
              model={tilesArray[6]}/>
            <Box
              style={boxMiddlePadding}
              type="small"
              cellWidth="1/3"
              ratio={0.5}
              paddingX={3}
              paddingRatio={2}
              model={tilesArray[7]}/>
            <Box
              type="small"
              cellWidth="1/3"
              ratio={0.5}
              fontStyle={{
                fontFamily: 'Lora'
              }}
              style={boxLeftPadding}
              model={tilesArray[8]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={mobileCellStyle}>
          <Grid gutter="0px">
            <Box
              style={boxRightPadding}
              cellWidth="2/3"
              ratio={1}
              model={tilesArray[9]}/>
            <Box
              style={boxLeftPadding}
              type="small"
              cellWidth="1/3"
              ratio={0.5}
              paddingX={3}
              paddingRatio={1}
              model={tilesArray[10]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={mobileCellStyle}>
          <Grid gutter="0px">
            <Box
              style={boxRightPadding}
              type="small"
              cellWidth="1/3"
              ratio={0.5}
              fontStyle={{
                fontFamily: 'Lora',
                fontStyle: 'italic',
                fontWeight: '200!important',
                lineHeight: 1.2
              }}
              paddingX={3}
              paddingRatio={1}
              model={tilesArray[11]}/>
            <Box
              cellWidth="2/3"
              ratio={1}
              fontStyle={{
                fontFamily: 'Lora',
                fontStyle: 'italic',
                fontWeight: '200!important',
                lineHeight: 1.2
              }}
              style={boxLeftPadding}
              model={tilesArray[12]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={mobileCellStyle}>
          <Grid gutter="0px">
            <Box
              style={boxRightPadding}
              cellWidth="2/3"
              ratio={1}
              model={tilesArray[13]}/>
            <Box
              style={boxLeftPadding}
              type="small"
              cellWidth="1/3"
              ratio={0.5}
              paddingX={3}
              paddingRatio={1}
              model={tilesArray[14]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={mobileCellStyle}>
          <Grid gutter="0px">
            <Box
              style={boxRightPadding}
              type="small"
              cellWidth="1/3"
              ratio={0.5}
              fontStyle={{
                fontFamily: 'Lora',
              }}
              paddingX={3}
              paddingRatio={1}
              model={tilesArray[15]}/>
            <Box
              style={boxLeftPadding}
              cellWidth="2/3"
              ratio={1}
              model={tilesArray[16]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={mobileCellStyle}>
          <Grid gutter="0px">
            <Box
              style={boxRightPadding}
              type="small"
              cellWidth="1/3"
              ratio={0.5}
              fontStyle={{
                fontFamily: 'Lora',
              }}
              model={tilesArray[17]}/>
            <Box
              type="small"
              cellWidth="1/3"
              ratio={0.5}
              fontStyle={{
                fontFamily: 'Lora',
              }}
              paddingX={3}
              paddingRatio={2}
              style={boxMiddlePadding}
              model={tilesArray[18]}/>
            <Box
              style={boxLeftPadding}
              type="small"
              cellWidth="1/3"
              ratio={0.5}
              model={tilesArray[19]}/>
          </Grid>
        </Cell>
        <Cell smallWidth="1/1" style={mobileCellStyle}>
          <Grid gutter="0px">
            <Box
              style={boxRightPadding}
              cellWidth="2/3"
              ratio={1}
              fontStyle={{
                fontFamily: 'Lora',
              }}
              model={tilesArray[20]}/>
            <Box
              style={boxLeftPadding}
              type="small"
              cellWidth="1/3"
              ratio={0.5}
              paddingX={3}
              paddingRatio={1}
              model={tilesArray[21]}/>
          </Grid>
        </Cell>
      </Grid>
    );
  }
  generateGrid() {
    let {medias} = this.props; // eslint-disable-line
    return (
      <div>
        {/* Desktop Tag Layout */}
        <div className={styles.lg}>
          {this.getDesktopTags(medias || [])}
        </div>
        {/* Mobile Tag Layout */}
        <div className={styles.sm}>
          {this.getMobileTags(medias || [])}
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


  render() {
    let {conversation, toggleGrowingOverlay, hasOverlayOpenedOnce, dispatch, error, isOverlayVisible} = this.props; // eslint-disable-line
    if (error) {
      return <div></div>;
    } else {     // eslint-disable-line

      const content = error ? this.generateNotFound() :
        this.generateGrid();

      const pageHeader = conversation.hasOwnProperty('name') ? conversation.name : 'missing data';
      const pageDescription = `What do you think about ${pageHeader}'s latest news? Want to be a part of the story? Go here.`;
      const pageImage = generateImageUrl({path: conversation.discoverImage});
      const shareMessages = this.getShareMessages(pageHeader);
      const imageString = require('./tag_pattern@2x.png');
      return (
        <div className={styles.container}>
          <Helmet title={`${pageHeader} conversation`}
                  meta={[
                    {name: 'description', content: pageDescription},
                    {property: 'og:description', content: pageDescription},
                    {property: 'og:image', content: pageImage}
                  ]} />
          <ShareOverlay isOverlayVisible={isOverlayVisible} toggle={toggleGrowingOverlay}
                        hasOverlayOpenedOnce={hasOverlayOpenedOnce} pageHeader={pageHeader} shareMessages={shareMessages}
                        dispatch={dispatch}/>
          <PageHeader pageType="conversation"
                      bgImg={imageString}
                      pageHeader={pageHeader}
                      dispatch={dispatch}
                      related={conversation.tags}
                      shareMessages={shareMessages}
                      toggleShareMenu={toggleGrowingOverlay}
                      isOverlayVisible={isOverlayVisible}/>
          <main className={styles.main}>
            {content}
          </main>
        </div>
      );
    }
  }
}

export default Conversation;
