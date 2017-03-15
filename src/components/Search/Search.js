import React, {Component, PropTypes} from 'react';
import {Grid, Cell} from 'radium-grid';
import {Text} from 'rebass';
import Overlay from '../Overlay/Overlay';
import Radium from 'radium';
import {Field, reduxForm} from 'redux-form';
const InputField = require('./../InputField/InputField');
const style = require('./Search.scss');

@reduxForm({
  form: 'search',
})
@Radium
export default class Search extends Component {
  static propTypes = {
    overlay: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func,
    toggleSearch: PropTypes.func.isRequired,
  };

  componentDidUpdate() {
    const {overlay} = this.props;
    if (overlay) {
      this.refs.search.getRenderedComponent().refs.input.focus();
    } else {
      this.refs.search.getRenderedComponent().refs.input.blur();
    }
  }

  render() {
    const {overlay, toggleSearch} = this.props;
    const {handleSubmit} = this.props;
    return ( // todo change overlay ugly hack
        <Overlay verticalAlign="flex-start" width={90} open={overlay}
                 className="Search"
                 onDismiss={toggleSearch}>
          <form onSubmit={handleSubmit}>
            <Grid cellWidth="1/1">
              <Cell verticalAlign="middle">
                <div
                    style={{color: '#5D5D5D', width: '19px', height: '12px', marginRight: '8px'}}
                    className="ic icon-search">
                </div>
                <Text
                    style={
                      {
                        fontSize: '18px',
                        color: '#DBDBDB'
                      }}>
                  search anything and hit enter
                </Text>
              </Cell>
              <Cell>
                <Field
                    className={style.search}
                    component={InputField}
                    style={{
                      color: 'rgba(244,243,243,1)',
                      fontWeight: 600,
                      background: 'transparent',
                      border: 'none',
                    }}
                    ref="search"
                    withRef
                    autoComplete="off"
                    name="search"
                    placeholder="Search"
                />
              </Cell>
            </Grid>
          </form>
        </Overlay>
    );
  }
}
