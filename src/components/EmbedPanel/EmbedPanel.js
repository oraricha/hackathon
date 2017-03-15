import React, {Component, PropTypes} from 'react';
import {Heading, Text, Block} from 'rebass';
import copy from 'copy-to-clipboard';

class EmbedPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
  }

  copy(text) {
    const {copiedCallback} = this.props;
    copy(text);
    this.setState({copied: true});
    setTimeout(() => {
      copiedCallback();
      setTimeout(() => {
        this.setState({copied: false});
      }, 1000);
    }, 1000);
  }

  render() {
    const {mediaId} = this.props; // eslint-disable-line
    console.log(mediaId);
    const buttonText = this.state.copied ?
        <div><i className="ic icon-check"/><span>&nbsp;Copied</span></div> :
        'Copy';
    const sem = `<iframe src=\"//renderer.qmerce.com/interaction/${mediaId}\"  width="100%" height="680" frameborder="0" scrolling="no"></iframe>`;
    return (
        <Block>
          <Text style={{
            textAlign: 'center',
          }} small mb={2}>EMBED</Text>
          <Heading px={3} mb={3} level={4} size={4} style={{fontWeight: 200}}>
            Copy and place this code wherever you want the interaction to appear:
          </Heading>

          <textarea
              style={{
                background: 'rgba(37,36,36,1)',
                color: 'rgba(146,146,146,1)',
                overflow: 'hidden',
                resize: 'none',
                border: 'none',
                width: '100%',
                height: '120px',
                padding: '12px 17px',
                fontStyle: 'italic',
              }}
              ref="textarea"
              readOnly
              value={sem}
              name="textarea"
          />
          <button style={{
            width: '100%',
            background: '#383838',
            borderRadius: '0px 0px 5px 5px',
            border: '0px',
            outline: 'none',
            color: '#A8A7A7',
            fontSize: '13px',
            padding: '13px',
            marginTop: '-4px',
            fontWeight: '600',
          }}
                  onClick={() => {
                    this.copy(this.refs.textarea.value);
                  }}>
            {buttonText}
          </button>
        </Block>
    );
  }
}

EmbedPanel.propTypes = {
  mediaId: PropTypes.string,
  copiedCallback: PropTypes.func,
};
EmbedPanel.defaultProps = {};

export default EmbedPanel;
