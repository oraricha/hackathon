import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {App,
  Discover,
  Tag,
  Media,
  Results,
  Channel,
  Conversation,
  NotFound,
  About,
  Publishers,
  Advertisers,
  Terms,
  Privacy
} from 'containers';


export default (store) => { // eslint-disable-line

  /**
   * Please keep routes in alphabetical order
   */
  return (
      <Route path="/" component={App}>
        { /* Discover (main) route */ }
        <IndexRoute component={Discover}/>

        { /* Routes */ }
        <Route path="tags/:tagId" component={Tag}/>
        <Route path="channels/:channelId" component={Channel}/>
        <Route path="media/:mediaId" component={Media}/>
        <Route path="results/:query" component={Results}/>
        <Route path="conversations/:conversationName" component={Conversation}/>
        <Route path="about" component={About}/>
        <Route path="publishers" component={Publishers}/>
        <Route path="advertisers" component={Advertisers}/>
        //
        <Route path="terms" component={Terms}/>
        <Route path="privacy" component={Privacy}/>
        { /* Catch all route */ }
        <Route path="*" component={NotFound} status={404}/>
      </Route>
  );
};
