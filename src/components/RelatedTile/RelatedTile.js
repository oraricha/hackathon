/**
 * Created by oriavraham on 21/09/2016.
 */

import React, {PropTypes} from 'react';
import {Tile, TileLayer, Hashtags, PublisherBlock} from 'components';
import {Link} from 'react-router';
import {Heading, LinkBlock} from 'rebass';
import {Grid, Cell} from 'radium-grid';

function createMarkup(title) {
  return {__html: title};
}

const RelatedTile = (props) => {
  const {tags, interactionId, teasers, publisher, hidePublisher, fontStyle, ...others} = props; // send 'childProps'
  let {title} = props;
  if (!teasers) {
    return (<div></div>);
  } else { // eslint-disable-line
    title = teasers[0].title.value || title;
    const frontLayer = (
        <TileLayer disableSlide placeholderColor="#333333"
                   background={teasers[0]} {...props}>
          <Grid gutter="0px"
                cellWidth="1"
                style={{height: '100%', width: '100%'}}>
            <Cell verticalAlign="top">
              <div>
                <Hashtags tags={tags}/>
              </div>
            </Cell>
            <Cell
                xlargeWidth="3/4"
                width="3/4"
                verticalAlign="middle"
                smallVerticalAlign="bottom">
              <LinkBlock is={Link} to={`/media/${interactionId}`}>
                <Heading
                    style={fontStyle}
                    _className="ResponsiveHeading Heading"
                    size={3}
                    level={3}>
                  <div dangerouslySetInnerHTML={createMarkup(title)}/>
                </Heading>
              </LinkBlock>
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

    return (
        <Tile {...others} layers={[frontLayer]}/>
    );
  }
};

RelatedTile.propTypes = {
  children: PropTypes.node,
  tags: PropTypes.array,
  interactionId: PropTypes.string,
  title: PropTypes.string,
  teasers: PropTypes.array.isRequired,
  publisher: PropTypes.object,
  hidePublisher: PropTypes.bool,
  fontStyle: PropTypes.object,
};

export default RelatedTile;
