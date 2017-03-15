import React, {PropTypes} from 'react';
import {Grid, Cell} from 'radium-grid';
import {Text} from 'rebass';
import {Media} from 'rebass';
import {Link} from 'react-router';
import {generateImageUrl} from '../../../helpers/prefixes';
const styles = require('./ChannelResults.scss');

const MAX_CHANNELS_NUMBER = 10;

function validChannels(channels) {
  return channels.map((relatedChannel) => {
    try {
      return generateImageUrl(relatedChannel.profileImage) ? relatedChannel : undefined;
    } catch (err) {
      console.log(err);
    }
  }).filter(element => { return (element !== undefined); });
}

function getRelatedChannels(channels, isDesktop) {
  const channelItem = (channel, index) => {
    const itemStyle = isDesktop ? styles['channel-related'] : styles['channel-related-mobile'];
    const titleStyle = isDesktop ? styles['channel-title'] : styles['channel-title-mobile'];
    const imageStyle = isDesktop ? styles.flag__image : styles.flag__image__mobile;
    return (
      <li className={itemStyle} key={`${channel.name}-${index}`}>
        <Link to={`/channels/${channel.publisherId}`}>
          <div className={imageStyle}>
            <Media
              align="center"
              mb={0}
              img={channel.imageUrl}>
              <h4 className={titleStyle}>{channel.name}</h4>
              {/* <h5 className={`${styles['channel-medias-number']}`}>{'mediasNumber'}</h5> */}
            </Media>
            {(isDesktop) ? <div className={styles['channel-bottom-line']}/> : ''}
          </div>
        </Link>
      </li>
    );
  };
  //
  const channelsList = channels.map((relatedChannel, index) => {
    const publisherId = relatedChannel.publisherId;
    const name = relatedChannel.name;
    const imageUrl = generateImageUrl(relatedChannel.profileImage);
    // todo get the channel medias count and show it.
    // const mediasNumber = '3.1K Medias';
    return channelItem({publisherId, name, imageUrl}, index);
  });
  const style = (isDesktop) ? `${styles['channel-suggestions']} ${styles.list}`
    : `${styles['channel-suggestions']} ${styles['mobile-list']}`;
  return (
      <div className={style}>
        <ul>{channelsList}</ul>
      </div>
  );
}

function getDesktopChannelResults(channelsArray) {
  // filter relevant channels.
  const filteredChannels = validChannels(channelsArray);
  // convert channels to items.
  const relatedChannels = (channelsArray.length > 0) ? getRelatedChannels(filteredChannels, true) : [];
  const style = {minWidth: '100%'};
  return (
    <Cell cellWidth="1/1" style={style}>
      <Grid>
        <Cell cellWidth="1/1">
          <Text style={{
            display: 'inline',
            fontFamily: 'Lato',
            fontWeight: '800',
            fontSize: '18px',
            margin: '10px 5px 0'
          }} bold>{`Channels`}</Text>
          <Text style={{display: 'inline', opacity: 0.8, fontWeight: '100', fontSize: '15px', margin: '12px 5px 0'}}>
            {`(${filteredChannels.length})`}</Text>
        </Cell>
        <Cell cellWidth="1/1">
          {relatedChannels}
        </Cell>
      </Grid>
    </Cell>
  );
}

function getMobileChannelResults(channelsArray) {
  const relatedChannels = (channelsArray.length > 0) ? getRelatedChannels(channelsArray, false) : [];
  const style = {margin: '10px 0', minWidth: '100%', height: `${(channelsArray.length > 0) ? '56px' : '0'}`};
  return (
    <Cell style={style}>
     {relatedChannels}
    </Cell>
  );
}

const ChannelResults = (props) => {
  const {channelsArray, forMobile} = props;
  const channels = channelsArray.slice(0, MAX_CHANNELS_NUMBER);
  return (forMobile ? getMobileChannelResults(channels) : getDesktopChannelResults(channels));
};

ChannelResults.propTypes = {
  channelsArray: PropTypes.array.isRequired,
  forMobile: PropTypes.bool,
};

ChannelResults.defaultProps = {
  channelsArray: [],
  forMobile: false,
};

export default ChannelResults;
