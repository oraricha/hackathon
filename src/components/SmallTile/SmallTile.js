/**
 * Created by oriavraham on 21/09/2016.
 */

import React, {PropTypes} from 'react';
import {Tile, TileLayer, Hashtags, PublisherBlock} from 'components';
import Media from '../../components/MediaObject2/Media';
import {Link} from 'react-router';
import {Heading, LinkBlock} from 'rebass';
import {Grid, Cell} from 'radium-grid';
import styles from '../TileLayer/TileLayer.scss';

// import style from './SmallTile.scss';
function createMarkup(title) {
  return {__html: title};
}

const SmallTile = (props) => {
  const {tags, interactionId, teasers, publisher, hidePublisher, fontStyle, ...others} = props; // send 'childProps'
  let {title} = props;
  if (!teasers || teasers.length === 0) {
    return (<div></div>);
  } else { // eslint-disable-line
    title = teasers[0].title.value || title;
    const heading = (
      <Heading style={fontStyle} _className="ResponsiveHeading Heading" level={2}>
        <div dangerouslySetInnerHTML={createMarkup(title)}/>
      </Heading>);
    const frontLayer = (
        <TileLayer placeholderColor="#3D9970"
                   background={teasers[0]} {...props}>
          <Grid gutter="0px"
                cellWidth="1"
                style={{height: '100%', width: '100%'}}>
            <Cell verticalAlign="top">
              <div className={styles.desktopOnly}>
                <Hashtags tags={tags} disabled={!interactionId}/>
              </div>
            </Cell>
            <Cell
                xlargeWidth="3/4"
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
        </TileLayer>);

    const backlayer = (
        <Grid style={{paddingBottom: 'inherit', background: '#EE2E3D', boxShadow: 'inset 0px 0px 0px 1px #000000', width: '100%', textAlign: 'center'
}}>
          <Cell width="1/1" align="center" verticalAlign="middle">
            <LinkBlock is={Link} to={`/media/${interactionId}`}>
              <Heading
                  style={{
                    fontFamily: 'Lora',
                    fontWeight: '600',
                  }}
                  level={1}
                  size={0}>
                80%
              </Heading>
              <Media
                  align="center"
                  img={"https://images.apester.com/user-images%2F20%2F20d155dd79b0f1486ec5e98f04a2118f.png"}
                  imgWidth="55px"
                  imgHeight="55px">

                <Heading size={2} level={2} style={{
                }}>
                  From Ohio<br/> voted “Yes”
                </Heading>
              </Media>
            </LinkBlock>
          </Cell>
        </Grid>
    );
    // We're hacking Heading to be responsive, we might just standardize all
    // h1-51 object and removie _className from heading.
    return (
        <Tile {...others} layers={[frontLayer, backlayer]}/>);
  }
};

SmallTile.propTypes = {
  children: PropTypes.node,
  tags: PropTypes.array,
  interactionId: PropTypes.string,
  title: PropTypes.string,
  teasers: PropTypes.array.isRequired,
  publisher: PropTypes.object,
  hidePublisher: PropTypes.bool,
  fontStyle: PropTypes.object,
};

SmallTile.defaultProps = {
  teasers: [],
};

export default SmallTile;
