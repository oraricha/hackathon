const LOAD = 'tag/LOAD';
const LOAD_SUCCESS = 'tag/LOAD_SUCCESS';
const LOAD_FAIL = 'tag/LOAD_FAIL';
const LOAD_RELATED = 'tag/LOAD_RELATED';
const LOAD_RELATED_SUCCESS = 'tag/LOAD_RELATED_SUCCESS';
const LOAD_RELATED_FAIL = 'tag/LOAD_RELATED_FAIL';

const TOGGLE_GROWING_OVERLAY = 'tag/growing_overlay/TOGGLE_GROWING_OVERLAY';
const CLOSE_GROWING_OVERLAY = 'tag/growing_overlay/CLOSE_GROWING_OVERLAY';

const TOGGLE_SEARCH = 'search/TOGGLE_SEARCH';
const isServer = (typeof window === 'undefined');
const initialState = {
  loaded: false,
  hasOverlayOpenedOnce: false,
  isOverlayVisible: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        hasOverlayOpenedOnce: false,
        timeToLoad: (new Date()).getTime()
      };
    case LOAD_SUCCESS:
      if (isServer) {
        console.log('finished reqeust to load tag page in ' + ((new Date()).getTime() - state.timeToLoad) + ' milliseconds.');
      }
      return {
        ...state,
        loading: false,
        loaded: true,
        tag: action.result.payload
      };
    case LOAD_FAIL:
      if (isServer) {
        console.log('failed to load tag page in ' + ((new Date()).getTime() - state.timeToLoad) + ' milliseconds.');
      }
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    case LOAD_RELATED:
      return {
        ...state,
        loading_related: true,
        timeToLoadRelated: (new Date()).getTime()
      };
    case LOAD_RELATED_SUCCESS:
      if (isServer) {
        console.log('finished reqeust to load tag page related in ' + ((new Date()).getTime() - state.timeToLoadRelated) + ' milliseconds.');
      }
      return {
        ...state,
        loading_related: false,
        loaded_related: true,
        relatedTags: action.result.payload
      };
    case LOAD_RELATED_FAIL:
      if (isServer) {
        console.log('failed to load tag page related in ' + ((new Date()).getTime() - state.timeToLoadRelated) + ' milliseconds.');
      }
      return {
        ...state,
        loading_related: false,
        loaded_related: false
      };
    case TOGGLE_GROWING_OVERLAY:
      return {
        ...state,
        hasOverlayOpenedOnce: true,
        isOverlayVisible: !state.isOverlayVisible,
      };
    case TOGGLE_SEARCH:
      return {
        ...state,
        isOverlayVisible: false,
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.tag && globalState.tag.loaded;
}

export function load(tagName) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/feeds/consumer?tag=${tagName}`)
  };
}

export function loadRelated(tagName) {
  return {
    types: [LOAD_RELATED, LOAD_RELATED_SUCCESS, LOAD_RELATED_FAIL],
    promise: (client) => client.get(`/tags/${tagName}/relatedTags`)
  };
}

export function toggleGrowingOverlay() {
  return {
    type: TOGGLE_GROWING_OVERLAY,
  };
}

export function closeGrowingOverlay() {
  return {
    type: CLOSE_GROWING_OVERLAY,
  };
}
