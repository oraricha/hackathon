/**
 * Created by oriavraham on 21/09/2016.
 */

import React, {PropTypes} from 'react';
import {Tile, TileLayer, Hashtags, PublisherBlock} from 'components';
import {Link} from 'react-router';
import {Heading, LinkBlock} from 'rebass';
import {Grid, Cell} from 'radium-grid';
import styles from '../TileLayer/TileLayer.scss';
// import {getRandomColor} from '../../helpers/randomColors';

// import style from './MediaTile.scss';
function createMarkup(title) {
  return {__html: title};
}

const MediaTile = (props) => {
  const {tags, interactionId, teasers, publisher, hidePublisher, fontStyle, ...others} = props;
  let {title} = props;
  if (!teasers || teasers.length === 0) {
    return (<div></div>);
  } else { // eslint-disable-line
    title = teasers[0].title.value || title;
    // We're hacking Heading to be responsive, we might just standardize all
    // h1-51 object and removie _className from heading.
    const heading = (
      <Heading style={fontStyle} _className="ResponsiveHeading Heading" level={2}>
        <div dangerouslySetInnerHTML={createMarkup(title)}/>
      </Heading>);
    const frontLayer = (
        <TileLayer placeholderColor="#4C2993"
                   background={teasers[0]} {...props}>
          <Grid gutter="0px"
                cellWidth="1"
                style={{height: '100%', width: '100%'}}>
            <Cell verticalAlign="top">
              <div style={{width: '60%'}} className={styles.desktopOnly}>
                <Hashtags tags={tags} disabled={!interactionId}/>
              </div>
            </Cell>
            <Cell
                xlargeWidth="7/16"
                largeWidth="3/8"
                width="3/4"
                verticalAlign="middle"
                smallVerticalAlign="bottom">
              {interactionId ?
                <LinkBlock is={Link} to={`${`/media/${interactionId}`}`}>
                  {heading}
                </LinkBlock> : heading}
            </Cell>
            <Cell verticalAlign="bottom" smallAlign="left"
                  smallVerticalAlign="bottom">
              {(() => {
                if (!!publisher & !hidePublisher) {
                  return <PublisherBlock {...publisher} />;
                }
              })()}
            </Cell>
          </Grid>
        </TileLayer>
    );

    const backlayer = <div></div>;
    return (
        <Tile {...others} layers={[frontLayer, backlayer]}/>);
  }
};

MediaTile.propTypes = {
  children: PropTypes.node,
  tags: PropTypes.array,
  interactionId: PropTypes.string,
  title: PropTypes.string,
  teasers: PropTypes.array.isRequired,
  publisher: PropTypes.object,
  hidePublisher: PropTypes.bool,
  fontStyle: PropTypes.object,
};


MediaTile.defaultProps = {
  teasers: [],
};


export default MediaTile;
