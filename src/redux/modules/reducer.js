import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import { loadingBarReducer } from 'react-redux-loading-bar';

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import discover from './discover';
import channel from './channel';
import tag from './tag';
import search from './search';
import media from './media';
import conversation from './conversation';
import menu from './menu';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form,
  loadingBar: loadingBarReducer,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  widgets,
  discover,
  channel,
  tag,
  media,
  search,
  conversation,
  menu
});
