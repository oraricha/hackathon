import React, {PropTypes, Component} from 'react';
import {Heading, Text, Button} from 'rebass';
import {Grid, Cell} from 'radium-grid';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import Media from '../../components/MediaObject2/Media';
@connect(
    () => {
      return ({
      });
    }, {pushState: push}
)
export default class CustomError extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string.isRequired,
    pushState: PropTypes.func
  };
  render() {
    const {description, title, pushState} = this.props;
    const img = require('./banana@2x.png');
    return (
        <Grid>
          <Cell width="1/1" style={{height: '430px'}} verticalAlign="middle"
                align="center">
            <Media
                align="center"
                img={img}
                imgWidth="270px"
            >
              <Heading mb={1} size={3} style={{
                color: '#DBDBDB',
                width: '270px'
              }}>
                {title}
              </Heading>
              <Text mb={2} style={{
                width: '175px',
                color: '#DBDBDB',
                fontSize: '13px'
              }}>
                {description}
              </Text>
              <Button
                  onClick={() => {
                    pushState('/');
                  }}
                  p={2}
                  backgroundColor="rgba(0,0,0,1)"
                  color="rgba(168,167,167,1)"
                  inverted
                  rounded
              >
                Go to Apester Discover
              </Button>
            </Media>
          </Cell>
        </Grid>
    );
  }
}
