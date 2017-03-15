const LOAD = 'media/LOAD';
const LOAD_SUCCESS = 'media/LOAD_SUCCESS';
const LOAD_FAIL = 'media/LOAD_FAIL';
const LOAD_RELATED = 'media/LOAD_RELATED';
const LOAD_RELATED_SUCCESS = 'media/LOAD_RELATED_SUCCESS';
const LOAD_RELATED_FAIL = 'media/LOAD_RELATED_FAIL';
const CLOSE_OVERLAY = 'media/CLOSE_OVERLAY';
const OPEN_AUTOPLAY = 'media/OPEN_AUTOPLAY';
const OPEN_EMBED = 'media/OPEN_EMBED';
const isServer = (typeof window === 'undefined');
const initialState = {
  loaded: false,
  overlay: false,
  autoplay: true,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        overlay: false,
        loading: true,
        timeToLoad: (new Date()).getTime()
      };
    case LOAD_SUCCESS:
      if (isServer) {
        console.log('finished reqeust to load media page in ' + ((new Date()).getTime() - state.timeToLoad) + ' milliseconds.');
      }
      return {
        ...state,
        loading: false,
        loaded: true,
        media: action.result.payload,
      };
    case LOAD_FAIL:
      if (isServer) {
        console.log('failed to load media page in ' + ((new Date()).getTime() - state.timeToLoad) + ' milliseconds.');
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
        loading: true,
        timeToLoadRelated: (new Date()).getTime()
      };
    case LOAD_RELATED_SUCCESS:
      if (isServer) {
        console.log('finished reqeust to load media related in ' + ((new Date()).getTime() - state.timeToLoadRelated) + ' milliseconds.');
      }
      return {
        ...state,
        loading: false,
        loaded: true,
        related: action.result.payload
      };
    case LOAD_RELATED_FAIL:
      if (isServer) {
        console.log('failed load media related in ' + ((new Date()).getTime() - state.timeToLoadRelated) + ' milliseconds.');
      }
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };

    case CLOSE_OVERLAY:
      return {
        ...state,
        overlay: false,
      };
    case OPEN_AUTOPLAY:
      return {
        ...state,
        overlay: true,
        autoplay: true,
      };
    case OPEN_EMBED:
      return {
        ...state,
        overlay: true,
        autoplay: false, // in case we want more overlay option we should change to object.
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.media && globalState.media.loaded;
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => {
      // Hack for times.
      if (id === '5818b78efc6240d9039d44d9') {
        return client.get(`/feeds/consumer/medias/0`);
      }
      return client.get(`/feeds/consumer/medias/${id}`);
    }
  };
}

export function loadRelated(id) {
  return {
    types: [LOAD_RELATED, LOAD_RELATED_SUCCESS, LOAD_RELATED_FAIL],
    promise: (client) => client.get(`/medias/${id}/relatedMedia?limit=20`)
  };
}

export function toggleOverlay() {
  return {
    type: CLOSE_OVERLAY,
  };
}

export function openAutoplay() {
  return {
    type: OPEN_AUTOPLAY,
  };
}

export function openEmbed() {
  return {
    type: OPEN_EMBED,
  };
}
