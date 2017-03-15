import React from 'react';
import {Row} from 'react-flexbox-grid';

const GridRow = (props) => {
  return (
      <Row {...props} style={{
        marginRight: 0,
        marginLeft: 0
      }}/>
  );
};

GridRow.propTypes = {};
GridRow.defaultProps = {};

export default GridRow;
