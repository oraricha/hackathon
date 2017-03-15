import React from 'react';
import {Route} from 'react-router';
import {App,
  Media,
  NotFound,
} from 'containers';


export default (store) => { // eslint-disable-line

  /**
   * Please keep routes in alphabetical order
   */
  return (
      <Route path="/" component={App}>
        { /* Routes */ }
        <Route path="media/:mediaId" component={Media}/>
        { /* Catch all route */ }
        <Route path="*" component={NotFound} status={404}/>
      </Route>
  );
};
