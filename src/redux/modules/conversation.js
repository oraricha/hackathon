const LOAD = 'conversation/LOAD';
const LOAD_SUCCESS = 'conversation/LOAD_SUCCESS';
const LOAD_FAIL = 'conversation/LOAD_FAIL';

const LOAD_PROPS = 'conversation/LOAD_PROPS';
const LOAD_PROPS_SUCCESS = 'conversation/LOAD_PROPS_SUCCESS';
const LOAD_PROPS_FAIL = 'conversation/LOAD_PROPS_FAIL';

const TOGGLE_GROWING_OVERLAY = 'conversation/growing_overlay/TOGGLE_GROWING_OVERLAY';
const CLOSE_GROWING_OVERLAY = 'conversation/growing_overlay/CLOSE_GROWING_OVERLAY';

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
        console.log('finished reqeust to conversation page in ' + ((new Date()).getTime() - state.timeToLoad) + ' milliseconds.');
      }
      return {
        ...state,
        loading: false,
        loaded: true,
        medias: action.result.payload.medias,
        feedError: null,
      };
    case LOAD_FAIL:
      if (isServer) {
        console.log('failed to conversation page in ' + ((new Date()).getTime() - state.timeToLoad) + ' milliseconds.');
      }
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    case LOAD_PROPS:
      return {
        ...state,
        loading: true,
        hasOverlayOpenedOnce: false,
      };
    case LOAD_PROPS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        conversation: action.result.payload,
        error: null,
      };
    case LOAD_PROPS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        feedError: action.error,
      };
    case TOGGLE_GROWING_OVERLAY:
      return {
        ...state,
        hasOverlayOpenedOnce: true,
        isOverlayVisible: !state.isOverlayVisible,
      };
    case CLOSE_GROWING_OVERLAY:
    case TOGGLE_SEARCH:
      return {
        ...state,
        isOverlayVisible: false,
      };
    default:
      return state;
  }
}

export function load(name) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/feeds/consumer?conversation=${name}&limit=22`)
  };
}

export function loadProps(name) {
  return {
    types: [LOAD_PROPS, LOAD_PROPS_SUCCESS, LOAD_PROPS_FAIL],
    promise: (client) => client.get(`/conversations/${name}`)
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
