import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {push} from 'react-router-redux';
import {StatusPanel, CustomError} from 'components';
import {Grid, Cell} from 'radium-grid';
import Helmet from 'react-helmet';
import {load as loadResults, closeSearch, toggleSearch} from 'redux/modules/search';
import MediaResults from '../../components/Results/MediaResults/MediaResults';
import TagResults from '../../components/Results/TagResults/TagResults';
import ChannelResults from '../../components/Results/ChannelResults/ChannelResults.js';
const styles = require('../Results/Results.scss');

@asyncConnect([{
  promise: ({store: {dispatch}, params}) => {
    return dispatch(loadResults(params.query));
  },
}])
@connect(
    state => {
      return ({
        results: state.search.results,
        error: state.search.error,
        loaded: state.search.loaded,
      });
    }, {pushState: push})
class Results extends Component {
  static propTypes = {
    results: PropTypes.object,
    error: PropTypes.object,
    loaded: PropTypes.bool,
    dispatch: PropTypes.func,
    pushState: PropTypes.func.isRequired,
    params: PropTypes.object,
  };

  componentDidMount() {
    if (this.props.loaded || this.props.error) {
      this.props.dispatch(closeSearch());
    }
  }

  componentDidUpdate() {
    if (this.props.loaded || this.props.error) {
      this.props.dispatch(closeSearch());
    }
  }

  componentWillUnmount() {
    if (this.props.loaded || this.props.error) {
      this.props.dispatch(closeSearch());
    }
  }

  statusPanelClickHandler() {
    this.props.dispatch(toggleSearch());
  }

  generateGrid() {
    const breakpoints = {
      small: '@media only screen and (max-width: 600px)',
      medium: '@media only screen and (min-width: 600px) and (max-width:'
              + ' 960px)',
      large: '@media only screen and (min-width: 960px) and (max-width:'
             + ' 1600px)',
      xlarge: '@media only screen and (min-width: 1600px)'
    };
    let {results} = this.props; // eslint-disable-line
    results = results.payload;
    const tilesArray = results.medias;
    const tagsArray = results.tags;
    const channelsArray = results.channels;
    const mobileGridStyle = {padding: '0'};
    const desktopGridStyle = {padding: '10px 10px 0 10px'};
    return (
        <div>
          {/* Desktop Results Layout */}
          <div className={styles.lg}>
            <Grid
                breakpoints={breakpoints}
                gutter="0px"
                cellWidth="1/1" style={desktopGridStyle}>
              <Cell cellWidth="3/4" smallWidth="1/1">
                 <MediaResults tilesArray={tilesArray}/>
              </Cell>
              <Cell cellWidth="1/4" smallWidth="1/1" style={{padding: '0 0 0 20px'}}>
                <Grid gutter="0px">
                  <TagResults tagsArray={tagsArray}/>
                  <ChannelResults channelsArray={channelsArray}/>
                </Grid>
              </Cell>
            </Grid>
          </div>
          {/* Mobile Results Layout */}
          <div className={`${styles.sm} ${styles.md}`}>
            <Grid
              gutter="0px"
              cellWidth="1" style={mobileGridStyle}>
              <Cell cellWidth="1/1" smallWidth="1/1">
                <Grid gutter="0px">
                  <TagResults tagsArray={tagsArray} forMobile/>
                </Grid>
              </Cell>
              <Cell cellWidth="1/1" smallWidth="1/1">
                <Grid gutter="0px">
                  <ChannelResults channelsArray={channelsArray} forMobile/>
                </Grid>
              </Cell>
              <Cell cellWidth="1/1" smallWidth="1/1">
                <MediaResults tilesArray={tilesArray} forMobile/>
              </Cell>
            </Grid>
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
    const content = (this.props.error) ? this.generateNotFound() :
        this.generateGrid();
    const {query} = this.props.params;
    return (
        <div className={styles.container}>
          <Helmet title="Results"/>
          <StatusPanel title={query} handleClick={this.statusPanelClickHandler.bind(this)}/>
          <main className={styles.main}>
            {content}
          </main>
        </div>
    );
  }
}

export default Results;


