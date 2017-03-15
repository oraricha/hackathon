import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as searchActions from '../../redux/modules/search';
import {Link} from 'react-router';
import LoadingBar from 'react-redux-loading-bar';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import CategoriesBar from '../CategoriesBar/CategoriesBar';
import {bindActionCreators} from 'redux';
@connect(
  state => ({
    category: state.discover.category,
  }),
  dispatch => bindActionCreators({ ...searchActions}, dispatch)
)
class NavBar extends Component {
  static propTypes = {
    searchOpened: PropTypes.bool.isRequired,
    showSelectedCategory: PropTypes.bool,
    // reducer dispatcher
    dispatch: PropTypes.func,
    // reducer state
    category: PropTypes.string,
    // reducer actions
    toggleSearch: PropTypes.func,
    closeSearch: PropTypes.func,
    closeGrowingOverlay: PropTypes.func,
    //
    toggleMenu: PropTypes.func,
    closeMenu: PropTypes.func,
    menuOpened: PropTypes.bool,
    handleSelectedCategory: PropTypes.func,
    //
    currentPath: PropTypes.string,
  };

  constructor() {
    super();
  }

  openSearch() {
    this.props.toggleSearch();
  }

  closeSearch() {
    this.props.closeSearch();
  }

  loadHomePage() {
    this.closeSearch();
    this.props.handleSelectedCategory('news');
    this.closeSearch();
    this.props.dispatch({
      type: 'ANALYTICS_EVENT',
      payload: {
        eventCategory: 'Top Bar',
        eventAction: 'Apester clicked',
        eventLabel: ''
      }
    });
  }

  startNowClicked() {
    this.props.dispatch({
      type: 'ANALYTICS_EVENT',
      payload: {
        eventCategory: 'Top Bar',
        eventAction: 'Start Now clicked',
        eventLabel: ''
      }
    });
  }


  sendBecomePartnerEvent() {
    this.props.dispatch(
      {
        type: 'ANALYTICS_EVENT',
        payload: {
          eventCategory: 'become a partner clicked'
        }
      }
    );
  }

  render() {
    const styles = require('./NavBar.scss');
    const {
      toggleSearch, searchOpened,
      category, currentPath,
      showSelectedCategory,
      menuOpened, toggleMenu, closeMenu,
      handleSelectedCategory, dispatch
    } = this.props;
    const currentCategory = showSelectedCategory ? category : '';
    const displaySearch = {display: (menuOpened) ? 'none' : ''};
    const displayMenu = {display: (searchOpened) ? 'none' : ''};
    return (
      <header className={styles.navbar}>
        <div style={{maxWidth: '1600px', width: '100%', margin: 'auto', padding: 0}}>
          <div className={styles.left}>
            <Link onClick={() => {this.loadHomePage();}} className={styles.logo} to="/#"/>
            <div className={`${styles.category} ${styles.md}`}>
              <CategoriesBar
                currentCategory={currentCategory}
                handleSelectedCategory ={handleSelectedCategory}/>
            </div>
          </div>
          <div className={styles.right}>
            <HeaderBar dispatch={dispatch} currentHeader={currentPath}/>
            <div style={displaySearch}>
              {!searchOpened ?
                <a className={`${styles.search}`} onClick={() => {this.openSearch();}}>
                  <i className={`ic icon-search`}></i>
                  <span>search</span>
                </a> :
                <a className={`${styles.search} ${styles['search-open']}`} onClick={toggleSearch}>
                  <i className={`ic icon-cross`}></i>
                  <span>close</span>
                </a>
              }
            </div>
            <div style={displayMenu}>
              {!menuOpened ?
                <a className={`${styles.menu}`} onClick={toggleMenu}>
                  <i className={`ic icon-hamburger`}></i>
                  <span>menu</span>
                </a> :
                <a className={`${styles.menu} ${styles['menu-open']}`} onClick={closeMenu}>
                  <i className={`ic icon-cross`}></i>
                  <span>close</span>
                </a>
              }
            </div>
            <div className={`${styles.start}`}>
              <Link onClick={() => {this.startNowClicked();}}
                    target="_blank"
                    to="https://app.apester.com/">
                <p>Start Now</p>
              </Link>
            </div>
          </div>
        </div>
        <LoadingBar style={{bottom: '-3px', backgroundColor: '#ee2e3d'}}/>
      </header>
    );
  }
}

export default NavBar;
