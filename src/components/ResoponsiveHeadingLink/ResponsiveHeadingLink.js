/**
 * Created by oriavraham on 25/09/2016.
 */
import React, {PropTypes} from 'react';
import {HeadingLink} from 'rebass';
const ResponsiveHeadingLink = (props, context) => {
  const {children} = props;
  const {media} = context;
  let size;
  switch (media) {
    case 'large':
      size = 6;
      break;
    case 'small':
      size = 2;
      break;
    default:
      size = 5;
  }

  return (
      <HeadingLink {...props} size={size}>
        {children}
      </HeadingLink>
  );
};

ResponsiveHeadingLink.propTypes = {
  media: PropTypes.array,
  children: PropTypes.node,
};

export default ResponsiveHeadingLink;
