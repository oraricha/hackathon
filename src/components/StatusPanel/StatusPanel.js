import React, {PropTypes} from 'react';
import {Heading, Text} from 'rebass';
import {Grid, Cell} from 'radium-grid';

const StatusPanel = (props) => {
  const {title, handleClick} = props;
  return (
      <div style={{
        position: 'fixed',
        top: '60px',
        width: '100%',
        maxWidth: '1600px',
      }} onClick={handleClick}>
        <Grid cellWidth="1/1" style={{
          marginLeft: '54px',
          height: '212px',
        }}>

          <Cell
              verticalAlign="middle">
            <Grid gutter="0px"
                  cellWidth="1">
              <Cell>
                <div style={{marginLeft: '42px'}}>
                  <Text style={{textTransform: 'uppercase',
                opacity: '0.5',
                fontSize: '12px',
                letterSpacing: '2.4px',
                }} small>RESULTS FOR</Text>
                </div>
              </Cell>
              <Cell>
                <div
                    style={{color: '#5D5D5D', fontSize: '28px', width: '28px', height: '28px', marginTop: '8px', marginRight: '12px'}}
                    className="ic icon-search">
                </div>
                <Heading style={{
                  fontSize: '42px',
                  color: 'white'
                }}>
                  {title}
                </Heading>
              </Cell>
            </Grid>
          </Cell>
        </Grid>
      </div>
  );
};

StatusPanel.propTypes = {
  title: PropTypes.string,
  handleClick: PropTypes.func,
};

StatusPanel.defaultProps = {};

export default StatusPanel;
