/**
 * Created by oriavraham on 21/09/2016.
 */

import React, {PropTypes} from 'react';
import {Tile, TileLayer, Hashtags, PublisherBlock} from 'components';
import {Link} from 'react-router';
import {LinkBlock, Heading} from 'rebass';
import {Grid, Cell} from 'radium-grid';
// import styles from '../Tile/Tile.scss';

function createMarkup(title) {
  return {__html: title};
}

const FeaturedTile = (props) => {
  const {tags, interactionId, teasers, publisher, hidePublisher, fontStyle, ...others} = props;
  let {title} = props;
  if (!teasers || teasers.length === 0) {
    return (<div></div>);
  } else { // eslint-disable-line
    title = teasers[0].title.value || title;
    const heading = (
      <Heading
        style={fontStyle}
        _className="ResponsiveHeading Heading"
        level={1}>
        <div dangerouslySetInnerHTML={createMarkup(title)}/>
      </Heading>);
    const frontLayer = (
        <TileLayer placeholderColor="#FF851B"
                   background={teasers[0]}
                   interactionId={interactionId} {...props}>
          <Grid gutter="0px"
                style={{flexDirection: 'column', height: '100%', width: '100%'}}>
            <Cell
                verticalAlign="bottom"
                width="9/10">
              <Grid gutter="0px"
                    cellWidth="1">
                <Cell verticalAlign="middle">
                  <div style={{marginBottom: '10px', width: '60%'}}>
                    <Hashtags tags={tags} disabled={!interactionId}/>
                  </div>
                </Cell>
                <Cell
                    xlargeWidth="3/4"
                    width="3/4"
                    verticalAlign="bottom"
                    smallVerticalAlign="bottom">
                  {interactionId ?
                    <LinkBlock is={Link} to={`${`/media/${interactionId}`}`}>
                      {heading}
                    </LinkBlock> : heading}
                </Cell>
              </Grid>
            </Cell>
            <Cell
                width="1/10 "
                verticalAlign="bottom" smallAlign="left"
                smallVerticalAlign="bottom">
              {(() => {
                if (!!publisher & !hidePublisher) {
                  return (<PublisherBlock
                      responsiveHide={false} {...publisher} />);
                }
              })()}
            </Cell>
          </Grid>
        </TileLayer>
    );
    return (
        <Tile {...others} layers={[frontLayer]}/>
    );
  }
};

FeaturedTile.propTypes = {
  children: PropTypes.node,
  interactionId: PropTypes.string,
  tags: PropTypes.array,
  title: PropTypes.string,
  teasers: PropTypes.array.isRequired,
  publisher: PropTypes.object,
  hidePublisher: PropTypes.bool,
  fontStyle: PropTypes.object,
};

FeaturedTile.defaultProps = {
  teasers: [],
};

export default FeaturedTile;
