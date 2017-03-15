import React, {Component, PropTypes} from 'react';
import {LinkBlock, Media, Text} from 'rebass';
import {Link} from 'react-router';
import {generateImageUrl} from '../../helpers/prefixes';

export default class PublisherBlock extends Component {
  static propTypes = {
    publisherId: PropTypes.string,
    profileImage: PropTypes.object,
    responsiveHide: PropTypes.bool,
    name: PropTypes.string
  };

  static defaultProps ={
    responsiveHide: true,
  };

  render() {
    const {publisherId, profileImage, responsiveHide, name} = this.props;
    const path = generateImageUrl(profileImage);
    const styles = require('./PublisherBlock.scss');
    return (
        // todo: LinkBlock to 'div' and add this class to context when
        // removing the wrapper div
        <div className={styles.container}>
          <LinkBlock
              to={`/channels/${publisherId}`}
              is={Link}
              onClick={(event) => {
                event.stopPropagation();
              }}>
            <Media
                align="center"
                mb={0}
                img={path}>
              <div className={`${responsiveHide ? styles.text : ''}`}>
                <Text color="white" style={{fontSize: '13px'}}>
                  {name}
                </Text>
              </div>
            </Media>
          </LinkBlock>
        </div>
    );
  }
}
