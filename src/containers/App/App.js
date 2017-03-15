import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {
    isLoaded as isDiscoverLoaded,
    load as loadDiscover,
  changeCategory
} from 'redux/modules/discover';
import {push} from 'react-router-redux';
import config from '../../config';
import {asyncConnect} from 'redux-async-connect';
import {NavBar, Footer, Search, CategoriesMenu} from 'components';
import {StyleRoot} from 'radium';
import ReactGA from 'react-ga';
import * as searchActions from 'redux/modules/search';
import * as menuActions from '../../redux/modules/menu';

if (typeof window !== 'undefined') {
  ReactGA.initialize('UA-37159059-14');
}

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isDiscoverLoaded(getState())) {
      promises.push(dispatch(loadDiscover()));
    }
    return Promise.all(promises);
  }
}])
@connect(
    state => ({
      user: state.auth.user,
      overlay: state.search.overlay,
      menuOpened: state.menu.toggled,
      category: state.discover.category,
    }),
    {pushState: push, changeCategory, ...menuActions, ...searchActions})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    toggleSearch: PropTypes.func.isRequired,
    closeSearch: PropTypes.func,
    toggleMenu: PropTypes.func.isRequired,
    closeMenu: PropTypes.func,
    dispatch: PropTypes.func,
    overlay: PropTypes.bool,
    location: PropTypes.object,
    menuOpened: PropTypes.bool,
    category: PropTypes.string,
    changeCategory: PropTypes.func,
  };

  static childContextTypes = {
    rebass: React.PropTypes.object
  };

  getChildContext() {
    return {
      rebass: {
        fontSizes: [64, 48, 24, 18, 16, 14, 12],
        scale: [
          0, 8, 12, 22, 34
        ],
        Heading: {
          color: 'white',
        },
        Text: {
          fontFamily: 'Lato',
          color: 'white'
        }
      }
    };
  }
  componentDidMount() {
    const path = this.currentPath();
    const src = this.props.location.query && this.props.location.query.src ? this.props.location.query.src : '';
    // TO DO : remove this to an outer redux reducer, more generic one that
    // handle events :)
    this.props.dispatch({
      type: 'APP_LAUNCH',
      src: src,
      path: path
    });
  }

  currentPath() {
    return this.props.location.pathname.split('/')[1];
  }

  isDiscoverPage() {
    return (this.currentPath() === '');
  }

  redirectTo(path) {
    const {pushState} = this.props;
    pushState(`${path}`);
  }

  openMenu() {
    this.props.closeSearch();
    this.props.toggleMenu();
  }

  closeMenu() {
    this.props.closeMenu();
  }

  handleSubmit(values) {
    const searchTerm = values.search.trim();
    // if nothing is typed - don't search but keep the overlay open
    if (searchTerm === '') {
      return;
    }
    //   this.props.dispatch(searchActions.toggleSearch());
    this.redirectTo(`/results/${searchTerm}`);
  }

  trafficOut(category) {
    const eventAction = category.toUpperCase();
    this.props.dispatch({
      type: 'ANALYTICS_EVENT',
      payload: {
        eventCategory: 'Top Bar',
        eventAction: `Categories`,
        eventLabel: `${eventAction}`
      }
    });
  }

  selectedCategoryHandler(newCategory) {
    window.scrollTo(0, 0);
    this.closeMenu();
    this.trafficOut(newCategory);
    this.props.changeCategory(newCategory);
    if (!this.isDiscoverPage()) {
      this.redirectTo('/');
    }
  }

  render() {
    const styles = require('./App.scss');
    const {overlay, toggleSearch, menuOpened, dispatch, closeMenu} = this.props;
    const showSelectedCategory = this.isDiscoverPage();
    return (
        <StyleRoot className="Apester">
          <div>
            <Helmet {...config.app.head}/>
            <NavBar dispatch={dispatch}
                    currentPath={this.currentPath()}
                    searchOpened={overlay}
                    showSelectedCategory={showSelectedCategory}
                    toggleMenu={this.openMenu.bind(this)}
                    closeMenu={this.closeMenu.bind(this)}
                    menuOpened={menuOpened}
                    handleSelectedCategory={this.selectedCategoryHandler.bind(this)}
            />
            <div className={styles.appContent}>
              <Search overlay={overlay}
                      toggleSearch={toggleSearch}
                      onSubmit={this.handleSubmit.bind(this)}
              />
              <CategoriesMenu toggled={menuOpened}
                              dispatch={dispatch}
                              closeMenu={closeMenu}
                              handleSelectedCategory={this.selectedCategoryHandler.bind(this)}
              />
              {this.props.children}
            </div>
            <Footer dispatch={dispatch}/>
          </div>
        </StyleRoot>
    );
  }
}
