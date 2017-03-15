/**
 * Created by omrikeret on 10/25/16.
 */
import React, {Component} from 'react';
import Styles from './IframeWrapper.scss';
class IframeWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {loading: true};
  }

  componentWillMount() {
    this.props.loadingBarActions.showLoading();
  }

  componentDidMount() {
    this.props.loadingBarActions.hideLoading();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({loading: true});
      this.props.loadingBarActions.showLoading();
    }
  }

  onIframeLoaded() {
    this.setState({loading: false});
    this.props.loadingBarActions.hideLoading();
  }

  render() {
    const curtainStyle = this.state.loading ? '' : Styles.loaded;
    const iframeStyle = this.state.loading ? {} : this.props.inharetStyle;
    return (
      <div className={Styles.MediaIframe}>
        <svg className={`${Styles.curtain} ${curtainStyle}`} width="100%"
             height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <pattern id="innerPattern" x="0" y="0" width="65" height="66"
                     patternUnits="userSpaceOnUse">
              <g id="Patterns" stroke="none" strokeWidth="1" fill="none"
                 fillRule="evenodd">
                <g id="4-copy" stroke="rgba(255, 255, 255, 0.18) "
                   strokeWidth="3">
                  <g id="Group">
                    <path
                      d="M0,2.09150327 C2.1764764,3.93209715 4.3529528,5.77269103 6.5294292,7.61328491"
                      id="Path-6"></path>
                    <path
                      d="M0.842105263,29.7427384 C3.83658047,27.7762047 6.83105567,25.809671 9.82553088,23.8431373"
                      id="Path-7"></path>
                    <path
                      d="M48.8421053,3.90583722 C51.164765,2.60389148 53.4874248,1.30194574 55.8100846,0"
                      id="Path-11"></path>
                    <path d="M41.2631579,38.9621207 L46.292334,29.6993464"
                          id="Path-12"></path>
                    <path
                      d="M22.3157895,35.1372549 C24.3460825,37.835034 26.3763755,40.532813 28.4066685,43.2305921"
                      id="Path-13"></path>
                    <path d="M25.5558185,10.5676452 L31.6466975,18.6609824"
                          id="Path-13-Copy"
                          transform="translate(28.601258, 14.614314) rotate(-28.000000) translate(-28.601258, -14.614314) "></path>
                    <path
                      d="M5.05263158,57.3071895 C8.98330856,58.1896194 12.9139855,59.0720493 16.8446625,59.9544792"
                      id="Path-14"></path>
                    <path d="M38.7368421,63.7678053 L42.9998579,56.0522876"
                          id="Path-15"></path>
                    <path
                      d="M57.6842105,47.756655 C59.6608268,46.1994258 61.6374431,44.6421965 63.6140595,43.0849673"
                      id="Path-16"></path>
                  </g>
                </g>
              </g>
            </pattern>
          </defs>
          <rect fill="url(#innerPattern)" stroke="black" x="0" y="0"
                width="100%" height="100%"/>
        </svg>
        {!this.state.loading ? '' :
          <div className={Styles.blobs}>
          <div className={Styles.blob}></div>
          <div className={Styles.blob}></div>
          <div className={Styles.apester}>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 138">
              <path className={Styles.st0} d="M100,39.5L100,39.5V0.4L75,23.7L49.5,0.4L25,23.7L0,0.4v39.1v0.4v18.7v16.1v41.9v3.6v3.6  c0,7.6,6.2,13.8,13.9,13.8h0.3c7.6,0,13.8-6.2,13.8-13.8v-3.6v-3.6v-16.4h44v16.4v3.6v3.6c0,7.6,6.2,13.8,13.9,13.8h0.3  c7.7,0,13.9-6.2,13.9-13.8v-3.6v-3.6V74.7V58.6L100,39.5L100,39.5z M28,74.7V63.5c0-12.1,9.9-21.9,22-21.9s22,9.8,22,21.9v11.2  C72,74.7,28,74.7,28,74.7z"/>
            </svg>
          </div>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="goo">
                  <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                  <feBlend in2="goo" in="SourceGraphic" result="mix" />
                </filter>
              </defs>
            </svg>
        </div>}
        <iframe onLoad={() => {
          this.onIframeLoaded();
        }} className={Styles.iframeStyle} style={iframeStyle}
                src={this.props.src} frameBorder="0" width="100%"/>
      </div>
    );
  }
}

IframeWrapper.propTypes = {
  src: React.PropTypes.string.isRequired,
  placeHolder: React.PropTypes.string,
  inharetStyle: React.PropTypes.object,
  loadingBarActions: React.PropTypes.object,
};

IframeWrapper.defaultProps = {
  placeHolder: 'https://s3.amazonaws.com/qmerce-static-media/images/pattern.svg'
};

export default IframeWrapper;
