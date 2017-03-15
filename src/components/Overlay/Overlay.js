import React from 'react';
import {Base} from 'rebass';
import config from 'rebass/dist/config';
const styles = require('./Overlay.scss');

/**
 * Fixed positioned overlay for use with modal dialogs
 */

const Overlay = ({
  open,
  dark,
  fullWidth,
  width,
  box,
  onDismiss,
  children,
  align,
  verticalAlign,
  absolute,
  margin,
  className,
  showClose,
  // flag for choosing between fading overlay bg VS growing-circle overlay bg
  isGrowingCircleBg,
  // flag from containing page reducer - used to indicate the *growing overlay* has been opened once,
  // so we can place closing css animation class on it, otherwise animation is fired on each render of the containing page
  hasOverlayOpenedOnce,
  ...props
}, {rebass}) => {
  const {zIndex, scale, colors, borderRadius} = {...config, ...rebass};

  const innerStyle = {
    padding: scale[3],
    backgroundColor: colors.white,
    borderRadius
  };

  const sx = {
    root: {
      position: absolute ? 'absolute' : 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: isGrowingCircleBg ? 3 : zIndex[2],
      display: 'flex',
      pointerEvents: open ? 'auto' : 'none',
      opacity: open || isGrowingCircleBg ? 1 : 0,
      flexDirection: 'column',
      alignItems: align || 'center',
      justifyContent: verticalAlign || 'center',
      margin: margin,
    },
    dismiss: {
      display: isGrowingCircleBg ? 'none' : 'block',
      position: absolute ? 'absolute' : 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: dark ? colors.black : colors.white,
      opacity: 0.875
    },
    inner: {
      position: 'relative',
      zIndex: zIndex[1],
      minWidth: 320,
      width: fullWidth ? '100%' : null || `${width}%`,
      ...(box ? innerStyle : {})
    },
    close: {
      display: showClose ? 'block' : 'none',
      position: 'absolute',
      right: '25px',
      top: '25px',
      color: 'white',
      fontSize: '12px',
      cursor: 'pointer',
    },
    GrowingCircleBg: {
      display: isGrowingCircleBg ? 'block' : 'none'
    }
  };

  return (
    <div
      className={`${className ? className : '' } Overlay`}
      style={sx.root}>
      <div style={sx.dismiss}
           onClick={onDismiss}/>
      <div style={sx.close} className="ic icon-cross" onClick={onDismiss}/>
      <div style={sx.GrowingCircleBg} className={`${styles['growing-circle-bg']} ${open ? styles['is-open'] : ''} ${!open && hasOverlayOpenedOnce ? styles['is-closed'] : ''}`} onClick={onDismiss}></div>
      <Base {...props} className={isGrowingCircleBg ? styles['growing-circle-content'] : ''} baseStyle={sx.inner}>
        {children}
      </Base>
    </div>
  );
};

Overlay.propTypes = {
  /** Shows and hides overlay */
  open: React.PropTypes.bool,
  showClose: React.PropTypes.bool,
  /** Sets dark transparent overlay style */
  dark: React.PropTypes.bool,
  /** Sets padding and background white for the content container */
  box: React.PropTypes.bool,
  /** Sets content container full width */
  fullWidth: React.PropTypes.bool,
  /** Sets content container full width */
  width: React.PropTypes.number,
  /** Sets content container full width */
  align: React.PropTypes.string,
  /** Sets content container full width */
  verticalAlign: React.PropTypes.string,
  /** Sets content container full width */
  absolute: React.PropTypes.bool,
  /** Sets content container full width */
  margin: React.PropTypes.string,
  /** Click event callback for the Overlay background */
  onDismiss: React.PropTypes.func,
  className: React.PropTypes.string,
  isGrowingCircleBg: React.PropTypes.bool,
  hasOverlayOpenedOnce: React.PropTypes.bool,
};

Overlay.defaultProps = {
  open: false,
  showClose: false,
  isGrowingCircleBg: false,
  dark: true,
  onDismiss: () => {
  }
};

Overlay.contextTypes = {
  rebass: React.PropTypes.object
};

export default Overlay;

