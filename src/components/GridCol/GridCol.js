import React from 'react';
import {Col} from 'react-flexbox-grid';

const GridCol = (props) => {
  return (
      <Col style={{
        paddingLeft: 0,
        paddingRight: 0
      }} {...props}/>
  );
};

GridCol.propTypes = {};
GridCol.defaultProps = {};

export default GridCol;
