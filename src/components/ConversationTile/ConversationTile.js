import React, {PropTypes} from 'react';
import {PublisherTile} from 'components';
const ConversationTile = (props) => {
  return (
      <PublisherTile publisherId={props.name} logoSize={80} urlPrefix="conversations" {...props}/>
  );
};

ConversationTile.propTypes = {
  name: PropTypes.string,
};
export default ConversationTile;
