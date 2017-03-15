const LOAD = 'channel/LOAD';
const LOAD_SUCCESS = 'channel/LOAD_SUCCESS';
const LOAD_FAIL = 'channel/LOAD_FAIL';

const LOAD_PROPS = 'channel/LOAD_PROPS';
const LOAD_PROPS_SUCCESS = 'channel/LOAD_PROPS_SUCCESS';
const LOAD_PROPS_FAIL = 'channel/LOAD_PROPS_FAIL';

const LOAD_STATISTICS = 'channel/LOAD_STATISTICS';
const LOAD_STATISTICS_SUCCESS = 'channel/LOAD_STATISTICS_SUCCESS';
const LOAD_STATISTICS_FAIL = 'channel/LOAD_STATISTICS_FAIL';

const TOGGLE_GROWING_OVERLAY = 'channel/growing_overlay/TOGGLE_GROWING_OVERLAY';
const CLOSE_GROWING_OVERLAY = 'channel/growing_overlay/CLOSE_GROWING_OVERLAY';

const TOGGLE_SEARCH = 'search/TOGGLE_SEARCH';
const isServer = (typeof window === 'undefined');
const initialState = {
  loaded: false,
  hasOverlayOpenedOnce: false,
  isOverlayVisible: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_PROPS:
      return {
        ...state,
        loading: true,
        timeToLoadProps: (new Date()).getTime()
      };
    case LOAD_PROPS_SUCCESS:
      if (isServer) {
        console.log('finished reqeust to load channel props in ' + ((new Date()).getTime() - state.timeToLoadProps) + ' milliseconds.');
      }
      return {
        ...state,
        loading: false,
        loaded: true,
        channelProps: action.result.payload
      };
    case LOAD_PROPS_FAIL:
      if (isServer) {
        console.log('failed to load channel props in ' + ((new Date()).getTime() - state.timeToLoadProps) + ' milliseconds.');
      }
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        channelProps: {}
      };
    case LOAD_STATISTICS:
      return {
        ...state,
        loading: true
      };
    case LOAD_STATISTICS_SUCCESS:
      // console.error('or action result:', action.result);
      return {
        ...state,
        loading: false,
        loaded: true,
        channelStatistics: action.result.payload,
        error: null,
      };
    case LOAD_STATISTICS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        channelStatistics: null,
        error: action.error,
      };
    case LOAD:
      return {
        ...state,
        loading: true,
        hasOverlayOpenedOnce: false,
        timeToLoad: (new Date()).getTime()
      };
    case LOAD_SUCCESS:
      if (isServer) {
        console.log('finished reqeust to load channel page in ' + ((new Date()).getTime() - state.timeToLoad) + ' milliseconds.');
      }
      return {
        ...state,
        loading: false,
        loaded: true,
        channel: action.result.payload,
        feedError: null,
      };
    case LOAD_FAIL:
      if (isServer) {
        console.log('failed to load channel page in ' + ((new Date()).getTime() - state.timeToLoad) + ' milliseconds.');
      }
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
  return globalState.channel && globalState.channel.loaded;
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/feeds/consumer?channelId=${id}&limit=22`)
  };
}

export function loadStatistics(id) {
  return {
    types: [LOAD_STATISTICS, LOAD_STATISTICS_SUCCESS, LOAD_STATISTICS_FAIL],
    promise: (client) => client.get(`/channels/${id}/publicData`)
  };
}

export function loadChannelProperties(id) {
  return {
    types: [LOAD_PROPS, LOAD_PROPS_SUCCESS, LOAD_PROPS_FAIL],
    promise: (client) => client.get(`/channels/${id}`)
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
