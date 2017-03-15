import {createStore as _createStore, applyMiddleware, compose} from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import EventsService from '../helpers/EventsService';
import {loadingBarMiddleware} from 'react-redux-loading-bar';

export default function createStore(history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  function logPathChange({getState}) {
    return (next) =>
      (action) => {
        if (action.type === '@@router/LOCATION_CHANGE') {
          let prevState;
          // we deduce the state we are from the route of the url :)
          try {
            prevState =
              getState().routing.locationBeforeTransitions.pathname.split('/')[1];
          } catch (er) {
            // console.log(er);
          }
          const currState = action.payload.pathname.split('/')[1];
          const currStateId = action.payload.pathname.split('/')[2];
          try {
            if (typeof window !== 'undefined') {
              const type = currState || 'discover';
              EventsService.dispatchEvent(type, {
                eventAction: prevState || 'discover',
                eventCategory: type,
                eventLabel: currStateId
              });
              // EventsService.pageview(action.payload.pathname);
            }
          } catch (er) {
            console.log('error tracking event', er);
          }
        }
        if (action.type === 'APP_LAUNCH') {
          EventsService.dispatchEvent(action.type, {
            eventCategory: action.type,
            eventAction: action.path || 'discover',
            eventLabel: action.src
          });
        }
        if (action.type === 'ANALYTICS_EVENT') {
          EventsService.dispatchEvent(action.type, action.payload);
        }
        return next(action);
      };
  }

  // history.listen((loc)=>{
  //  console.log(historyFlow);
  //  historyFlow.push({'location': loc.pathname, 'search': loc.search});});
  const middleware = [createMiddleware(client), reduxRouterMiddleware, thunk, logPathChange, loadingBarMiddleware({
    promiseTypeSuffixes: ['/LOAD', '_SUCCESS', '_FAIL'],
  })];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const {persistState} = require('redux-devtools');
    const DevTools = require('../containers/DevTools/DevTools');
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() :
        DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const reducer = require('./modules/reducer');
  const store = finalCreateStore(reducer, data);


  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'));
    });
  }

  return store;
}
