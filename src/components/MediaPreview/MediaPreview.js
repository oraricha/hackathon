import React, {Component, PropTypes} from 'react';
import {
    Overlay,
    Panel,
    PanelHeader,
    PanelFooter,
    Button,
    Text,
    Close,
    Space
} from 'rebass';

class MediaPreview extends Component {
  static propTypes = {
    overlay: PropTypes.bool.isRequired,
    toggleOverlay: PropTypes.func.isRequired,
  };

  render() {
    const {overlay, toggleOverlay} = this.props;
    return (
        <Overlay
            open={overlay}
            onDismiss={toggleOverlay}
        >
          <Panel theme="success">
            <PanelHeader>
              Hello Overlay!
              <Space auto/>
              <Close onClick={toggleOverlay}/>
            </PanelHeader>
            <iframe
                src={`https://stage3-preview.qmerce.com/interaction/57d84f25ee5d111a06398d19`}
                style={{
                  maxWidth: '100%',
                  height: '350px',
                  width: '600px',
                }}/>
            <Text>
              <b>Panel:</b> Something laid as a covering over something else
            </Text>
            <PanelFooter>
              <Space auto/>
              <Button
                  theme="success"
                  onClick={toggleOverlay}
                  children="Meow!"/>
            </PanelFooter>
          </Panel>
        </Overlay>
    );
  }
}
export default MediaPreview;
