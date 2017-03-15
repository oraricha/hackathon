import React, {Component, PropTypes} from 'react';
import {Tile, TileLayer} from 'components';
import {Grid, Cell} from 'radium-grid';
import {Text} from 'rebass';
import {Field, reduxForm} from 'redux-form';
const InputField = require('./../InputField/InputField');
import Radium from 'radium';

const styles = require('./ContactUsForm.scss');
const options = ['General Inquiry', 'Publisher', 'Brand', 'Agency', 'Media/Press', 'Careers', 'Investor'];
const selectValues = options.map( (option, index)=> {
  return (<option key={`${option}-${index}`} value={index}>{option}</option>);
});

@reduxForm({
  form: 'send',
})
@Radium
class ContactUsForm extends Component {
  // todo use me once we implement the form with server side
  getDesktopForm() {
    const {header} = this.props;
    return (
      <form style={{margin: '10px 20px'}}>
        <Grid cellWidth="1/1">
          <Cell cellWidth="1/1" style={{marginBottom: '10px'}}>
            <Grid gutter="10px">
              <Cell cellWidth="1/3">
                <Text
                  style={
                    {
                      fontSize: '24px',
                      fontFamily: 'Lora',
                      fontWeight: '400',
                      fontStyle: 'italic',
                      color: '#DBDBDB',
                      width: '100%'
                    }}>
                  {header}
                </Text>
              </Cell>
              <Cell cellWidth="1/3">
                <Field
                  className={styles.inputField}
                  cellWidth="1/3"
                  component={InputField}
                  style={{
                    color: 'rgba(244,243,243,1)',
                    fontWeight: 600,
                    background: 'rgba(255,255,255,0.15)',
                    border: '0',
                    minHeight: '45px',
                    width: '100%',
                    marginLeft: '10px',
                  }}
                  ref="nameField"
                  withRef
                  autoComplete="off"
                  name="nameField"
                  placeholder="Name"
                />
              </Cell>
              <Cell cellWidth="1/3">
                <Field
                  className={styles.inputField}
                  component={InputField}
                  style={{
                    color: 'rgba(244,243,243,1)',
                    fontWeight: 600,
                    background: 'rgba(255,255,255,0.15)',
                    border: '0',
                    minHeight: '45px',
                    width: '100%'
                  }}
                  ref="emailField"
                  withRef
                  autoComplete="off"
                  name="emailField"
                  placeholder="Email"
                />
              </Cell>
            </Grid>
          </Cell>
          <Cell cellWidth="1/1" style={{marginBottom: '10px'}}>>
            <Grid gutter="10px">
              <Cell cellWidth="1/3" style={{maxHeight: '45px'}}>
                <Text
                  style={
                    {
                      fontSize: '17px',
                      color: '#DBDBDB',
                      width: '100%',
                      marginLeft: '-5px'
                    }}>
                  Complete the form and we will get back to you as soon as we can.
                </Text>
              </Cell>
              <Cell cellWidth="2/3">
                <div className={styles['select-style']}>
                  <select>
                    {selectValues}
                  </select>
                </div>
              </Cell>
            </Grid>
          </Cell>
          <Cell cellWidth="1/1" style={{marginBottom: '10px'}}>>
            <Grid gutter="10px">
              <Cell cellWidth="1/3">
                <div/>
              </Cell>
              <Cell cellWidth="2/3">
                <textarea
                  className={styles.inputFieldMessage}
                  style={{
                    color: 'rgba(244,243,243,1)',
                    fontWeight: 600,
                    background: 'rgba(255,255,255,0.15)',
                    border: '0',
                    width: '98.2%',
                    height: '100%',
                    minHeight: '150px'
                  }}
                  ref="messageField"
                  cols="40"
                  rows="5"
                  autoComplete="off"
                  name="messageField"
                  placeholder="Message"
                />
              </Cell>
            </Grid>
          </Cell>
          <Cell cellWidth="1/1">
            <Grid gutter="10px">
              <Cell cellWidth="1/3">
                <div/>
              </Cell>
              <Cell cellWidth="2/3">
                <a href="mailto:support@apester.com"
                   style={{height: '45px', width: '100%', backgroundColor: '#3D9BE9',
                     textAlign: 'center', marginLeft: '8px',
                     textDecoration: 'none'}}>
                  <Text
                    style={
                      {
                        fontSize: '18px',
                        color: '#FFFFFF',
                        margin: '10px 0 0 0',
                      }}>
                    Send
                  </Text>
                </a>
              </Cell>
            </Grid>
          </Cell>
        </Grid>
      </form>
    );
  } // eslint-disable-line
  // todo use me once we implement the form with server side
  getMobileForm() {
    const {header} = this.props;
    return (
      <form style={{margin: '0 15px', height: '100%', position: 'absolute'}}>
        <Grid cellWidth="1/1" style={{height: '100%'}}>
          <Cell cellWidth="1/1" style={{height: '8%'}}>
            <Grid gutter="0px">
              <Cell cellWidth="1/1">
                <Text
                  style={
                    {
                      fontSize: '18px',
                      fontFamily: 'Lora',
                      fontWeight: '400',
                      fontStyle: 'italic',
                      color: '#DBDBDB',
                      height: '100%',
                      width: '100%',
                    }}>
                  {header}
                </Text>
              </Cell>
            </Grid>
          </Cell>
          <Cell cellWidth="1/1" style={{height: '11%', marginBottom: '5px'}}>
            <Grid gutter="0px">
              <Cell cellWidth="1/1">
              <Text
                style={
                  {
                    fontSize: '13px',
                    color: '#DBDBDB',
                    width: '85%',
                    height: '100%',
                    marginLeft: '2px'
                  }}>
                Complete the form and we will get back to you as soon as we can.
              </Text>
            </Cell>
            </Grid>
          </Cell>
          <Cell cellWidth="1/1"style={{height: '11%', marginBottom: '5px'}}>
            <Field
              className={styles.inputField}
              cellWidth="1/1"
              component={InputField}
              style={{
                color: 'rgba(244,243,243,1)',
                fontWeight: 600,
                background: 'rgba(255,255,255,0.15)',
                border: '0',
                height: '100%',
                width: '100%',
              }}
              ref="nameField"
              withRef
              autoComplete="off"
              name="nameField"
              placeholder="Name"
            />
          </Cell>
          <Cell cellWidth="1/1" style={{height: '11%', marginBottom: '5px'}}>
            <Field
              className={styles.inputField}
              cellWidth="1/1"
              component={InputField}
              style={{
                color: 'rgba(244,243,243,1)',
                fontWeight: 600,
                background: 'rgba(255,255,255,0.15)',
                border: '0',
                height: '100%',
                width: '100%',
              }}
              ref="emailField"
              withRef
              autoComplete="off"
              name="emailField"
              placeholder="Email"
            />
          </Cell>
          <Cell cellWidth="1/1" style={{height: '41%', marginBottom: '5px'}}>
                <textarea
                  className={styles.inputFieldMessage}
                  style={{
                    color: 'rgba(244,243,243,1)',
                    fontWeight: 600,
                    background: 'rgba(255,255,255,0.15)',
                    border: '0',
                    width: '100%',
                    height: '100%',
                  }}
                  ref="messageField"
                  cols="40"
                  rows="5"
                  autoComplete="off"
                  name="messageField"
                  placeholder="Message"
                />
          </Cell>
          <Cell cellWidth="1/1" style={{height: '11%'}}>
            <a href="mailto:support@apester.com"
               style={{height: '100%', width: '100%', backgroundColor: '#3D9BE9',
                 textAlign: 'center',
                 textDecoration: 'none'}}>
              <Text
                style={
                  {
                    fontSize: '16px',
                    color: '#FFFFFF',
                    margin: '5px 0 0 0',
                  }}>
                Send
              </Text>
            </a>
          </Cell>
        </Grid>
      </form>
    );
  } // eslint-disable-line

  getContent(desktop) {
    const {header, subHeader} = this.props;
    const style = desktop ? {marginTop: '5%'} : {marginTop: '10%'};
    return (
      <div className={styles.container} style={style}>
        <div className={styles.header}>
            {header}
        </div>
        <div className={styles.subHeader}>
          {subHeader}
        </div>
        <div className={styles.button}>
          <a href="mailto:support@apester.com">
            <div style={{height: '20px', color: '#FFFFFF'}}>
              Contact us
            </div>
          </a>
        </div>
      </div>
    );
  }

  render() {
    const {...others} = this.props;
    const background = {image: {'background': [{'image': {path: 'space', type: 'static'}}] }};
    const frontLayer = (
      <TileLayer placeholderColor="#3D9770" {...this.props} background={background}>
          {/* <div className={styles.lg}> */}
          {/* {this.getDesktopForm()} */}
          {/* </div> */}
          {/* <div className={styles.sm}> */}
          {/* {this.getMobileForm()} */}
          {/* </div> */}
         <div className={styles.lg}>
           {this.getContent(true)}
         </div>
        <div className={styles.sm}>
          {this.getContent(false)}
        </div>
      </TileLayer>
    );
    return (
      <Tile {...others} layers={[frontLayer]}/>
    );
  }
}

ContactUsForm.propTypes = {
  header: PropTypes.string,
  subHeader: PropTypes.string,
};

ContactUsForm.defaultProps = {
  header: 'Talk to us!',
};

export default ContactUsForm;
