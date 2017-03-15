const LOAD = 'discover/LOAD';
const LOAD_SUCCESS = 'discover/LOAD_SUCCESS';
const LOAD_FAIL = 'discover/LOAD_FAIL';
const LOAD_PUBLISHERS = 'discover/LOAD_PUBLISHERS_';
const LOAD_PUBLISHERS_SUCCESS = 'discover/LOAD_PUBLISHERS_SUCCESS';
const LOAD_PUBLISHERS_FAIL = 'discover/LOAD_PUBLISHERS_FAIL';
const TOGGLE_PREVIEW = 'discover/TOGGLE_PREVIEW';
const CHANGE_CATEGORY = 'discover/CHANGE_CATEGORY';
//
const isServer = (typeof window === 'undefined');
//
const initialState = {
  loaded: false,
  overlay: false,
  category: 'default',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        timeToLoadPage: (new Date()).getTime()
      };
    case LOAD_SUCCESS:
      if (isServer) {
        console.log('finished reqeust to load discover page in ' + ((new Date()).getTime() - state.timeToLoadPage) + ' milliseconds.');
      }
      return {
        ...state,
        loading: false,
        loaded: true,
        discover: action.result.payload,
      };
    case LOAD_FAIL:
      if (isServer) {
        console.log('failed to load discover page in ' + ((new Date()).getTime() - state.timeToLoadPage) + ' milliseconds.');
      }
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    case LOAD_PUBLISHERS:

      return {
        ...state,
        loading: true
      };
    case LOAD_PUBLISHERS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case LOAD_PUBLISHERS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    case
    TOGGLE_PREVIEW:
      return {
        ...state,
        overlay: !state.overlay,
        previewing: action.mediaId
      };
    case CHANGE_CATEGORY:
      return (action.category !== state.category) ? {
        ...state,
        category: action.category,
      } : state;
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.discover && globalState.discover.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('feeds/consumer/categories/news?jambo=4&small=10&medium=10&conversations=12&gridNumberOfBoxes=4&videos=2')
  };
}

export function loadCategory(category) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`feeds/consumer/categories/${category}?jambo=4&small=10&medium=10&conversations=12&gridNumberOfBoxes=4&videos=2`)
  };
}

export function loadPublishers() {
  return {
    types: [LOAD_PUBLISHERS, LOAD_PUBLISHERS_SUCCESS, LOAD_PUBLISHERS_FAIL],
    promise: (client) => client.get('/feeds/consumer?displayInFeed=true')
  };
}


export function toggleOverlay(id) {
  return {
    type: TOGGLE_PREVIEW,
    toggle: id
  };
}

export function changeCategory(category) {
  return {
    type: CHANGE_CATEGORY,
    category: category
  };
}
