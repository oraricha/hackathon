/**
 * Created by oriavraham on 26/10/2016.
 */
import React from 'react';
import {Base} from 'rebass';
import config from 'rebass/dist/config';

/**
 * Media object with vertical alignment using flexbox
 */

const Media = ({
    img,
    imgWidth,
    imgHeight,
    right,
    align,
    children,
    ...props
}, {rebass}) => {
  const {scale} = {...config, ...rebass};

  const alignment = {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end'
  };

  const alignItems = alignment[align];

  return (
      <Base
          {...props}
          className="Media"
          baseStyle={{
            display: 'flex',
            marginBottom: scale[3],
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems
          }}>
        <img src={img}
             style={{
               flex: 'none',
               maxWidth: 'none',
               width: imgWidth || 'auto',
               height: imgHeight || 'auto',
               marginRight: right ? 0 : scale[3],
               marginLeft: right ? scale[3] : 0,
               order: right ? 9999 : null
             }}/>
        <div children={children}/>
      </Base>
  );
};

Media.propTypes = {
  /** Image source */
  img: React.PropTypes.string,
  /** Image source */
  imgWidth: React.PropTypes.string,
  imgHeight: React.PropTypes.string,
  /** Displays image to the right */
  right: React.PropTypes.bool,
  /** Vertical alignment */
  align: React.PropTypes.oneOf(['top', 'center', 'bottom'])
};

Media.contextTypes = {
  rebass: React.PropTypes.object
};

export default Media;
