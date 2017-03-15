import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {loadCategory, changeCategory} from 'redux/modules/discover';
import {Box, TileCarusel} from 'components';
import {Grid, Cell} from 'radium-grid';
// import {bindActionCreators} from 'redux';
import CategoriesBar from '../../components/CategoriesBar/CategoriesBar';

@connect(
  state => ({
    // dispatch: store.dispatch,
    discover: state.discover,
    category: state.discover.category,
    // publishers: state.discover.publishers,
    // conversations: state.discover.conversations,
    overlay: state.discover.overlay
  })
  // dispatch => bindActionCreators({toggleOverlay, loadCategory, changeCategory}, dispatch)
)
class Discover extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    discover: PropTypes.object,
    publishers: PropTypes.array,
    category: PropTypes.string,
    conversations: PropTypes.array,
    overlay: PropTypes.bool,
    // toggleOverlay: PropTypes.func.isRequired,
    // loadCategory: PropTypes.func,
    // changeCategory: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    const newCategory = nextProps.discover.category;
    if (this.props.discover.category !== newCategory && newCategory !== '') {
      this.props.dispatch(loadCategory(nextProps.discover.category));
    }
  }

  getDesktopMedias(data) {
    // desktop gap style
    const desktopGridStyle = {padding: '9px 9px 0 9px'};
    const desktopCellStyle = {margin: '0 0 9px 0'};
    // desktop box style
    const boxRightPadding = {paddingRight: '3px'};
    const boxMiddlePadding = {padding: '0 6px'};
    const boxLeftPadding = {paddingLeft: '3px'};
    const breakpoints = {
      small: '@media only screen and (max-width: 600px)',
      medium: '@media only screen and (min-width: 600px) and (max-width:'
      + ' 960px)',
      large: '@media only screen and (min-width: 960px) and (max-width:'
      + ' 1600px)',
      xlarge: '@media only screen and (min-width: 1600px)'
    };
    // fetch data
    const featuredArray = data.featuredArray;
    const mediumArray = data.mediumArray;
    const smallArray = data.smallArray;
    const publishers = data.publishers;
    const conversations = data.conversations;
    const videos = data.videos;
    //
    return (
      <Grid
        breakpoints={breakpoints}
        gutter="0px"
        cellWidth="1/1"
        style={desktopGridStyle}>
        {/* ROW - 0
         ---------------
         |       |   M   |
         |<  L  >|_______|
         |       |   |   |
         |     ..| S | S |
         ---------------
         */}
        <Cell style={desktopCellStyle}>
          <Grid gutter="8px" cellWidth="1/2" smallWidth="1/1">
            <Cell style={{ position: 'relative'}}>
                <TileCarusel timeToChange={7}>
                  <Box
                    style={{height: '100%'}}
                    type="featured"
                    cellWidth="1"
                    ratio={1}
                    model={featuredArray[0]}/>
                  <Box
                    style={{height: '100%'}}
                    type="featured"
                    cellWidth="1"
                    ratio={1}
                    model={featuredArray[1]}/>
                  <Box
                    style={{height: '100%'}}
                    type="featured"
                    cellWidth="1"
                    ratio={1}
                    model={featuredArray[2]}/>
                </TileCarusel>
            </Cell>
            <Cell smallWidth="1/1" style={{paddingLeft: '1px'}}>
              <Grid gutter="0px">
                <Cell cellWidth="1"
                      smallWidth="1/1">
                  <Grid gutter="0px">
                    <Box
                      fontStyle={{fontFamily: 'Lora'}}
                      cellWidth="1"
                      smallWidth="1/1"
                      ratio={2}
                      type={videos.length > 0 ? 'video' : 'initial'}
                      model={videos.length > 0 ? videos[0] : mediumArray[0]}/>
                  </Grid>
                </Cell>
                <Cell cellWidth="1"
                      smallWidth="1/1" style={{margin: '9px 0 0 0'}}>
                  <Grid gutter="9px">
                    <Box
                      cellWidth="1/2"
                      smallWidth="1/1"
                      ratio={1}
                      type="small"
                      model={smallArray[0]}/>
                    <Box
                      cellWidth="1/2"
                      smallWidth="1/1"
                      ratio={1}
                      type={'conversation'}
                      model={conversations[0]}/>
                  </Grid>
                </Cell>
              </Grid>
            </Cell>
          </Grid>
        </Cell>
        {/* ROW - 1
         -------------
         |P|P|   |     |
         |P|P| S |  M  |
         -------------
         */}
        <Cell cellWidth="1/1"
              smallWidth="1/1"
              style={desktopCellStyle}>
          <Grid gutter="9px">
            <Cell cellWidth="1/4"
                  smallWidth="1/1">
              <Grid gutter="0px">
                <Box
                  cellWidth="1/2"
                  ratio={1}
                  type={'publisher'}
                  model={publishers[0]}/>
                <Box
                  cellWidth="1/2"
                  ratio={1}
                  type={'publisher'}
                  model={publishers[1]}/>
                <Box
                  cellWidth="1/2"
                  ratio={1}
                  type={'publisher'}
                  model={publishers[2]}/>
                <Box
                  cellWidth="1/2"
                  ratio={1}
                  type={'publisher'}
                  model={publishers[3]}/>
              </Grid>
            </Cell>
            <Cell cellWidth="1/4"
                  smallWidth="1/1">
              <Grid gutter="0px">
                  <Box
                    fontStyle={{
                      fontFamily: 'Lora',
                      fontStyle: 'italic',
                      fontWeight: '200!important'
                    }}
                    cellWidth="1/1"
                    smallWidth="1/1"
                    ratio={1}
                    type="small"
                    model={smallArray[1]}/>
              </Grid>
            </Cell>
            <Cell cellWidth="1/2"
                  smallWidth="1/1">
              <Grid gutter="0px">
                <Box
                  cellWidth="1/1"
                  smallWidth="1"
                  ratio={2}
                  paddingX={6}
                  paddingRatio={-0.5}
                  model={mediumArray[1]}/>
              </Grid>
            </Cell>
          </Grid>
        </Cell>
        {/* ROW - 2
         -------------
         |   |     |   |
         | M |  S  | S |
         -------------
         */}
        <Cell cellWidth="1"
              smallWidth="1/1"
              style={desktopCellStyle}>
          <Grid gutter="0px">
            <Box
              cellWidth="1/2"
              smallWidth="1/1"
              ratio={2}
              style={boxRightPadding}
              model={mediumArray[2]}/>
            <Box
              style={boxMiddlePadding}
              fontStyle={{
                fontFamily: 'Lora',
              }}
              cellWidth="1/4"
              smallWidth="1/1"
              ratio={1}
              paddingX={6}
              paddingRatio={2}
              type={videos.length > 1 ? 'video' : 'small'}
              model={videos.length > 1 ? videos[1] : smallArray[2]}/>
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
              paddingX={6}
              paddingRatio={0.5}
              model={smallArray[3]}/>
          </Grid>
        </Cell>
        {/* ROW - 3
         -------------
         |   |     |   |
         | S |  M  | S |
         -------------
         */}
        <Cell cellWidth="1"
              smallWidth="1/1"
              style={desktopCellStyle}>
          <Grid gutter="0px">
            <Box
              style={boxRightPadding}
              cellWidth="1/4"
              smallWidth="1/1"
              type="small"
              ratio={1}
              model={smallArray[4]}/>
            <Box
              style={boxMiddlePadding}
              fontStyle={{
                fontFamily: 'Lora',
                fontStyle: 'italic',
                fontWeight: '200!important'
              }}
              cellWidth="1/2"
              smallWidth="1/1"
              ratio={2}
              paddingX={6}
              paddingRatio={0.5}
              model={mediumArray[3]}/>
            <Box
              style={boxLeftPadding}
              fontStyle={{
                fontFamily: 'Lora',
              }}
              cellWidth="1/4"
              type="small"
              smallWidth="1/1"
              ratio={1}
              model={smallArray[5]}/>
          </Grid>
        </Cell>
        {/* ROW - 4
         -------------
         |   |   |     |
         | S | S |  M  |
         -------------
         */}
        <Cell cellWidth="1"
              smallWidth="1/1" style={desktopCellStyle}>
          <Grid gutter="0px">
            <Box
              style={boxRightPadding}
              cellWidth="1/4"
              xlargeWidth="1/4"
              smallWidth="1/1"
              type="conversation"
              ratio={1}
              paddingX={5}
              paddingRatio={0.5}
              model={conversations[1]}/>
            <Box
              style={boxMiddlePadding}
              cellWidth="1/4"
              smallWidth="1/1"
              type="small"
              ratio={1}
              paddingX={6}
              paddingRatio={2}
              model={smallArray[6]}/>
            <Box
              style={boxLeftPadding}
              cellWidth="1/2"
              smallWidth="1/1"
              ratio={2}
              model={mediumArray[4]}/>
          </Grid>
        </Cell>
        {/*  <Cell
         xlargeWidth="2/10"
         cellWidth="1/1">
         <Grid
         breakpoints={breakpoints}
         gutter="0px"
         xlargeCellWidth="1/1">
         <Box
         fontStyle={{
         fontFamily: 'Lora',
         fontStyle: 'italic',
         fontWeight: '200!important'
         }}
         cellWidth="1/4"
         ratio={1}
         model={tilesArray[13]}
         type="small"/>
         <Box
         cellWidth="1/4"
         ratio={1}
         model={tilesArray[14]}
         type="small"/>
         <Box
         cellWidth="1/4"
         ratio={1}
         model={tilesArray[15]}
         type="small"/>
         <Box
         cellWidth="1/4"
         ratio={1}
         model={conversations[2]}
         type="conversation"/>
         <Cell xlargeWidth="1">
         <div className={styles.xlg}>
         <Grid gutter="0px" breakpoints={breakpoints}>
         <Box
         cellWidth="1"
         ratio={1}
         model={tilesArray[17]}
         type="small"/>
         <Box
         cellWidth="1"
         ratio={1}
         model={tilesArray[18]}
         type="small"/>
         </Grid>
         </div>
         </Cell>
         </Grid>
         </Cell>*/}
      </Grid>
    );
  }

  getMobileMedias(data) {
    // mobile gap style
    const mobileGridStyle = {padding: '10px 0'};
    const mobileCellStyle = {margin: '0 0 6px 0'};
    // mobile box style
    const boxRightPadding = {padding: '0 3px 0 0'};
    const boxMiddlePadding = {padding: '0 3px'};
    const boxLeftPadding = {padding: '0 0 0 3px'};
    // fetch data
    const tilesArray = data.tilesArray;
    const publishers = data.publishers;
    const conversations = data.conversations;
    const videos = data.videos;
    //
    return (
      <Grid
      gutter="6px"
      cellWidth="1/3"
      smallCellWidth="1/3"
      style={mobileGridStyle}>
      <Cell
        smallWidth="1/1">
        <Grid gutter="0px">
          <Box
            style={mobileCellStyle}
            cellWidth="1"
            ratio={1}
            type="featured"
            model={tilesArray[0]}/>
          <Box
            style={mobileCellStyle}
            type={videos.length > 0 ? 'video' : 'featured'}
            cellWidth="1"
            ratio={1}
            model={videos.length > 0 ? videos[0] : tilesArray[1]}/>
        </Grid>
      </Cell>
      <Cell
        style={mobileCellStyle}
        smallWidth="1/1">
        <Grid gutter="6px">
          <Box
            fontStyle={{
              lineHeight: 1.2
            }}
            smallWidth="1/3"
            ratio={1 / 2}
            paddingX={3}
            paddingRatio={1}
            model={tilesArray[2]}/>
          <Cell
            smallWidth="2/3">
            <Grid gutter="0px">
              <Box
                cellWidth="1/2"
                ratio={1}
                type={'publisher'}
                model={publishers[0]}/>
              <Box
                cellWidth="1/2"
                ratio={1}
                type={'publisher'}
                model={publishers[1]}/>
              <Box
                cellWidth="1/2"
                ratio={1}
                type={'publisher'}
                model={publishers[2]}/>
              <Box
                cellWidth="1/2"
                ratio={1}
                type={'publisher'}
                model={publishers[3]}/>
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
            smallWidth="1/3"
            ratio={0.5}
            paddingX={3}
            paddingRatio={1}
            model={tilesArray[3]}/>
          <Cell
            smallWidth="2/3">
            <Grid gutter="0px">
              <Box
                style={boxLeftPadding}
                smallWidth="1/1"
                ratio={1}
                type={'conversation'}
                model={conversations[0]}/>
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
            smallWidth="1"
            type="featured"
            ratio={1}
            model={tilesArray[4]}/>
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
            model={tilesArray[5]}/>
          <Box
            style={boxMiddlePadding}
            ratio={0.5}
            paddingX={3}
            paddingRatio={2}
            model={tilesArray[6]}/>
          <Box
            fontStyle={{
              fontFamily: 'Lora',
              fontStyle: 'italic',
              fontWeight: '200!important',
              lineHeight: 1.2
            }}
            style={boxLeftPadding}
            ratio={0.5}
            model={tilesArray[7]}/>
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
            model={tilesArray[8]}/>
          <Box
            fontStyle={{
              lineHeight: 1.2
            }}
            smallWidth="1/3"
            style={boxLeftPadding}
            ratio={0.5}
            paddingX={3}
            paddingRatio={1}
            model={tilesArray[9]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="0px">
          <Box
            smallWidth="1"
            type="featured"
            ratio={1}
            model={tilesArray[10]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="0px">
          <Box
            fontStyle={{
              fontFamily: 'Lora',
              fontStyle: 'italic',
              fontWeight: '200!important'
            }}
            style={boxRightPadding}
            smallWidth="2/3"
            ratio={1}
            model={tilesArray[11]}/>
          <Box
            fontStyle={{
              lineHeight: 1.2
            }}
            smallWidth="1/3"
            style={boxLeftPadding}
            ratio={0.5}
            paddingX={3}
            paddingRatio={1}
            model={tilesArray[12]}/>
        </Grid>
      </Cell>
      <Cell smallWidth="1/1" style={mobileCellStyle}>
        <Grid gutter="0px">
          <Box
            fontStyle={{
              fontFamily: 'Lora',
            }}
            smallWidth="1"
            type="featured"
            ratio={1}
            model={tilesArray[13]}/>
        </Grid>
      </Cell>
    </Grid>
    );
  }


  categoriesBar(selectedCategory) {
    const style = {height: '56px', paddingTop: '10px'};
    return (
      <div style={style}>
        <CategoriesBar
          currentCategory={selectedCategory}
          handleSelectedCategory ={this.handleSelectedCategory.bind(this)} forMobile/>
      </div>
    );
  }

  mockFlipDelay(media) {
    if (media.interactionId
      === '5815e4842aaef130597d2931'
      || media.interactionId
      === '58150f5c2aaef130597d2863' || true) {
      return 6 * 1000;
    }
  }

  trafficOut(category) {
    const eventAction = category.toUpperCase();
    this.props.dispatch({
      type: 'ANALYTICS_EVENT',
      payload: {
        eventCategory: 'Top Bar',
        eventAction: `Categories`,
        eventLabel: `${eventAction}`
      }
    });
  }

  handleSelectedCategory = (aCategory) => {
    const {category} = this.props;
    window.scrollTo(0, 0);
    const shouldUpdateCategory = (category !== aCategory);
    const newCategory = shouldUpdateCategory ? aCategory : '';
    this.props.dispatch(changeCategory(newCategory));
    if (shouldUpdateCategory) {
      this.trafficOut(newCategory);
    }
  };

  render() {
    const styles = require('./Discover.scss'); // eslint-disable-line
    const {discover, category} = this.props; // eslint-disable-line no-shadow
    const tilesArray = discover.discover.medias || [];
    const featuredArray = tilesArray.filter(media => media.placementType === 'jambo');
    const mediumArray = tilesArray.filter(media => media.placementType === 'medium');
    const smallArray = tilesArray.filter(media => media.placementType === 'small');
    const publishers = discover.discover.grid || [];
    const conversations = discover.discover.conversations || [];
    const videos = discover.discover.videos || [];
    // const {conversations} = this.props;
    const data = {featuredArray, mediumArray, smallArray, publishers, conversations, tilesArray, videos};
    return (
      <div>
        <Helmet title="Discover"/>
        <div className={styles.md}>
          {this.categoriesBar(category)}
        </div>
        {/* Desktop Discover Layout */}
        <div className={styles.lg} style={{
          maxWidth: '1600px',
          margin: 'auto' }}>
          {this.getDesktopMedias(data)}
        </div>
        {/* Mobile Discover Layout  */}
        <div className={styles.sm}>
          {this.getMobileMedias(data)}
        </div>
      </div>
    );
  }
}

export default Discover;
