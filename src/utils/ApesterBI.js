import 'whatwg-fetch'; // https://github.com/github/fetch

const urlPath = 'http://gcp-events.apester.com/event';

function getPathProperties(payload) {
  const eventName = payload.eventCategory.toLowerCase();
  const label = payload.eventLabel;
  const location = window.location;
  const src = location.search.split('src=');
  const pathname = location.pathname;
  let properties = {};
  if (src.length > 1) {
    const event = {eventName: eventName};
    const gateway = src[src.length - 1];
    properties = {gateway: gateway};
    const channelPath = pathname.split('/channels/');
    if (channelPath.length > 1) {
      properties = Object.assign(properties, {channelId: channelPath[1]});
      return Object.assign(event, {properties: properties});
    }
    const mediaInteractionPath = pathname.split('/media/');
    if (mediaInteractionPath.length > 1) {
      properties = Object.assign(properties, {interactionId: mediaInteractionPath[1]});
      return Object.assign(event, {properties: properties});
    }
  } else {
    const possibleEvents = {
      'media': {eventName: eventName, properties: {interactionId: label}},
      'channels': {eventName: eventName, properties: {channelId: label}},
      'app_launch': {eventName: eventName, properties: {}}
    };
    return possibleEvents[eventName];
  }
}

function getAnalyticsEventInfo(payload) {
  const label = payload.eventLabel;
  const action = payload.eventAction.toLowerCase();
  const eventName = payload.eventCategory.toLowerCase();
  const possibleEvents = {
    'categories': {eventName: action, properties: {discoverCategory: label}}, // feed category clicked
    'media link clicked': {eventName: eventName, properties: {interactionId: label}}, // media traffic-out link clicked
    'channel link clicked': {eventName: eventName, properties: {channelId: label}} // channel traffic-out link clicked
  };
  return possibleEvents[action] || getPathProperties(payload);
}

function generateBIEvent(type, payload) {
  // base event properties
  const eventData = {
    metadata: {
      referrer: encodeURIComponent(document.referrer),
      current_url: encodeURIComponent(window.location.href),
      screen_height: window.screen.height.toString(),
      screen_width: window.screen.width.toString(),
      language: window.navigator.userLanguage || window.navigator.language
    }
  };
  //
  let event;
  let properties;
  const info = getAnalyticsEventInfo(payload);
  if (!info || !info.eventName) {
    return null;
  }
  event = info.eventName;
  properties = info.properties;
  // validate and assign data
  eventData.event = event;
  if ((properties && Object.keys(properties).length > 0) || properties && type.toLowerCase() === 'app_launch') {
    eventData.properties = properties;
  }
  return eventData;
}

function dispatchEvent(type, payload) {
  const eventData = generateBIEvent(type, payload);
  // validate event data object
  if (!eventData) {
    return;
  }
  // send event data
  fetch(urlPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(eventData)
  }).then(data => { // eslint-disable-line
  }).catch(error => {
    console.error('request failed', error);
  });
}

export default {
  send: dispatchEvent,
};
