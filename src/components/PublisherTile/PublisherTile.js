/**
 * Created by oriavraham on 21/09/2016.
 */

import React, {PropTypes} from 'react';
import {Tile, TileLayer, Hashtags} from 'components';
import {generateImageUrl, generateStaticImage} from '../../helpers/prefixes';
import {Grid, Cell} from 'radium-grid';
import style from './PublisherTile.scss';
const PublisherTile = (props) => {
  const {publisherId, urlPrefix, tags, profileImage, discoverImage, backgroundColor, logoSize, ...others} = props;
  const path = generateImageUrl(discoverImage || profileImage);
  const frontLayer = (
      <TileLayer placeholderColor="white" urlPrefix={urlPrefix} opacity={0} backgroundColor={backgroundColor}
            publisherId={publisherId || props.model.publisherId} {...props}>
        <Grid gutter="0px" style={{height: '100%'}}>
          <Cell style={{maxHeight: '25%'}} width="1/1" align="left" verticalAlign="top">
            <Hashtags tags={tags} disabled={!publisherId}/>
          </Cell>
          <Cell width="1/1" align="center" verticalAlign="middle">
            <img
                style={{width: `${logoSize}%`}}
                className={style.box}
                src={generateStaticImage(path) || path}
            />
          </Cell>
          <Cell width="1/1" verticalAlign="bottom">
            <div/>
          </Cell>
        </Grid>
      </TileLayer>
  );

  return (
    <Tile {...others} layers={[frontLayer]}/>
  );
};

PublisherTile.propTypes = {
  children: PropTypes.node,
  publisherId: PropTypes.string,
  urlPrefix: PropTypes.string,
  tags: PropTypes.array,
  discoverImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  backgroundColor: PropTypes.string,
  logoSize: PropTypes.number,
  profileImage: PropTypes.object,
  model: PropTypes.object
};

PublisherTile.defaultProps = {
  urlPrefix: 'channels',
  logoSize: 60,
};

export default PublisherTile;
