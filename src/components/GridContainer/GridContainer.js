import React from 'react';
import {Grid} from 'react-flexbox-grid';

const GridContainer = (props) => {
  return (
      <Grid style={{
        paddingLeft: 0,
        paddingRight: 0
      }} {...props}/>
  );
};

GridContainer.propTypes = {};
GridContainer.defaultProps = {};

export default GridContainer;
