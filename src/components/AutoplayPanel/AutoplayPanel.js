import React, {Component, PropTypes} from 'react';
import {Heading, Text, Block} from 'rebass';
import {AutoplayTimer, AnimatedBlock} from 'components';
import {stripHtmlTags} from '../../helpers/utils';

class AutoplayPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.active) {
      this.setState({
        timerOn: false,
      });
    }
  }

  render() {
    const {media, active, completeCallback, cancelCallback} = this.props; // eslint-disable-line
    let title = stripHtmlTags(media.title);
    title = title.length > 120 ?
        `${title.substring(0, 120)}...` : title;
    const runTimer = active && this.state.timerOn;
    return (
        <Block style={{
          textAlign: 'center',
        }}>
          <AnimatedBlock name="upNext" active={active} delay={250} ease={"ease"}
                         animation={
         {'0%': { opacity: '0' },
           '100%': { opacity: '1' },
           }}>
            <Heading level={3} size={3}
                     mb={2}>Up Next: </Heading>
          </AnimatedBlock>
          <AnimatedBlock name="nextTile" active={active} delay={500}
                         ease={"ease"} animation={
          {'0%': { transform: 'translateY(-50px)', opacity: '0' },
           '100%': { transform: 'translateY(0)', opacity: '1' },
           }}>
            <Heading px={3} mb={3} level={4} size={5} style={{fontWeight: 200}}>
              {title}
            </Heading>
          </AnimatedBlock>
          <AnimatedBlock endCallBack={
            () => {
              this.setState({
                timerOn: true,
              });
            }} name="growingPlay" active={active} delay={750}
                         ease={"ease"} animation={
          {'0%': { transform: 'scale(0)'},
           '100%': { transform: 'scale(1)'},
           }}>
            <AutoplayTimer completeCallback={completeCallback} active={runTimer}
                           duration={3000}/>
          </AnimatedBlock>
          <AnimatedBlock name="nextCancel" active={active} delay={500}
                         ease={"ease"} animation={
          {'0%': { transform: 'translateY(-50px)', opacity: 0 },
           '100%': { transform: 'translateY(0)', opacity: 1 },
           }}>
            <div className="Cancel">
              <Text mt={3} style={{
                fontSize: '14px',
                cursor: 'pointer',
              }} onClick={cancelCallback}>Cancel</Text>
            </div>
          </AnimatedBlock>
        </Block>
    );
  }
}

AutoplayPanel.propTypes = {
  media: PropTypes.object,
  active: PropTypes.bool.isRequired,
  completeCallback: PropTypes.func,
  cancelCallback: PropTypes.func,
};
AutoplayPanel.defaultProps = {
  media: {},
};

export default AutoplayPanel;
