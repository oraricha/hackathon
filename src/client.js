/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import {Provider} from 'react-redux';
import {browserHistory, Router} from 'react-router';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import {syncHistoryWithStore} from 'react-router-redux';
import {ReduxAsyncConnect} from 'redux-async-connect';
import {useScroll} from 'react-router-scroll';
import getRoutes from './routes';

const objectFitImages = require('object-fit-images');
const client = new ApiClient();
const _browserHistory = browserHistory;
const dest = document.getElementById('content');
const store = createStore(_browserHistory, client, window.__data);
const history = syncHistoryWithStore(_browserHistory, store);
const component = (
    <Router render={(props) =>
        <ReduxAsyncConnect render={applyRouterMiddleware(useScroll())} {...props} helpers={{client}}
                           filter={item => !item.deferred}/>
    } history={history}>
      {getRoutes(store)}
    </Router>
);

// polyfill object-fit
objectFitImages();
ReactDOM.render(
    <Provider store={store} key="provider">
      {component}
    </Provider>,
    dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest
      || !dest.firstChild
      || !dest.firstChild.attributes
      || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools/DevTools');
  ReactDOM.render(
      <Provider store={store} key="provider">
        <div>
          {component}
          <DevTools />
        </div>
      </Provider>,
      dest
  );
}
