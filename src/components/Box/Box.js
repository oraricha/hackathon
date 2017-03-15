/**
 * Created by oriavraham on 21/09/2016.
 */

import React, {PropTypes} from 'react';
import style from './Box.scss';
import {Cell} from 'radium-grid';
import {
  PublisherTile,
  MediaTile,
  RelatedTile,
  FeaturedTile,
  SmallTile,
  ConversationTile,
  VideoTile,
  Contacts,
  ContactUsForm,
} from 'components';

// maybe move 'tile' to external function once we
// figure out prop validation

const Box = (props) => {
  let discoverImage;
  const tile = (() => {
    switch (props.type) {
      case 'initial':
        return (
            <MediaTile ratio={props.ratio}
                       paddingX={props.paddingX}
                       paddingRatio={props.paddingRatio}
                       flipDelay={props.flipDelay}
                       fontStyle={props.fontStyle} {...props.model}
                       hidePublisher={props.hidePublisher}
                       className={style[props.type || 'box']}
                       {...props}>
              {props.children}
            </MediaTile>
        );
      case 'related':
        return (
            <RelatedTile ratio={1}
                         fontStyle={props.fontStyle} {...props.model}
                         hidePublisher={false}
                         className={style[props.type || 'box']}
                         {...props}>
              {props.children}
            </RelatedTile>
        );
      case 'small':
        return (
            <SmallTile ratio={props.ratio}
                       flipDelay={props.flipDelay}
                       paddingX={props.paddingX}
                       paddingRatio={props.paddingRatio}
                       fontStyle={props.fontStyle} {...props.model}
                       hidePublisher={props.hidePublisher}
                       className={style[props.type || 'box']}
                       {...props}>
              {props.children}
            </SmallTile>
        );
      case 'publisher':
        const channel = (props.model && props.model.channel) ? props.model.channel : {};
        discoverImage = (channel && channel.discoverImage) ? {path: channel.discoverImage} : '';
        const publisherImage = discoverImage ? discoverImage : props.model.image;
        return (
            <PublisherTile ratio={props.ratio}
                           paddingX={props.paddingX}
                           paddingRatio={props.paddingRatio}
                           backgroundColor={(props.model.value && props.model.value)
                           || (props.model.backgroundColor) && props.model.backgroundColor}
                           {...props.model.channel}
                           discoverImage={publisherImage}
                           className={style[props.type || 'box']}
                           {...props}>
              {props.children}
            </PublisherTile>
        );
      case 'conversation':
        discoverImage = (props.model && props.model.discoverImage) ? props.model.discoverImage : undefined;
        const conversationImage = discoverImage ? {path: discoverImage} : props.model.image;
        return (
            <ConversationTile ratio={props.ratio}
                              paddingX={props.paddingX}
                              paddingRatio={props.paddingRatio}
                              fontStyle={props.fontStyle} {...props.model}
                              discoverImage={conversationImage}
                              className={style[props.type || 'box']}
                              {...props}>
              {props.children}
            </ConversationTile>
        );
      case 'featured':
        return (
            <FeaturedTile ratio={props.ratio}
                          paddingX={props.paddingX}
                          paddingRatio={props.paddingRatio}
                          fontStyle={props.fontStyle} {...props.model}
                          hidePublisher={props.hidePublisher}
                          className={style[props.type || 'box']}
                          {...props}>
              {props.children}
            </FeaturedTile>
        );
      case 'video':
        return (
          <VideoTile ratio={props.ratio}
                     paddingX={props.paddingX}
                     paddingRatio={props.paddingRatio}
                     video={props.model}
                     className={style[props.type || 'box']}
                     {...props}>
            {props.children}
          </VideoTile>
        );
      case 'contacts':
        return (<Contacts ratio={props.ratio}
                          paddingX={props.paddingX}
                          paddingRatio={props.paddingRatio}
                          fontStyle={props.fontStyle} {...props.model}
                          className={style[props.type || 'box']}
                          {...props}/>
          );
      case 'contactUsForm':
        return (<ContactUsForm ratio={props.ratio}
                               paddingX={props.paddingX}
                               paddingRatio={props.paddingRatio}
                               fontStyle={props.fontStyle} {...props.model}
                               className={style[props.type || 'box']}
                          {...props}/>
        );
      default:
        return <div/>;
    }
  })();
  return (
      <Cell {...props}>
        {tile}
      </Cell>
  );
};

Box.propTypes = {
  type: PropTypes.oneOf(['publisher', 'initial', 'featured', 'small', 'conversation', 'related', 'video', 'contacts', 'contactUsForm']).isRequired,
  model: PropTypes.object,
  ratio: PropTypes.number,
  flipDelay: PropTypes.number,
  hidePublisher: PropTypes.bool,
  fontStyle: PropTypes.object,
  children: PropTypes.node,
  paddingX: PropTypes.number,
  paddingRatio: PropTypes.number,
  click: PropTypes.func,
  displayDarknessOverlay: PropTypes.bool,
};

Box.defaultProps = {
  type: 'initial',
  ratio: 1,
  paddingX: 0,
  paddingRatio: 1,
  model: {},
  displayDarknessOverlay: true
};

export default Box;

