const LOAD = 'search/LOAD';
const LOAD_SUCCESS = 'search/LOAD_SUCCESS';
const LOAD_FAIL = 'search/LOAD_FAIL';
const TOGGLE_SEARCH = 'search/TOGGLE_SEARCH';
const CLOSE_SEARCH = 'search/CLOSE_SEARCH';

const initialState = {
  loaded: false,
  overlay: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_SEARCH:
      return {
        ...state,
        overlay: !state.overlay,
      };
    case CLOSE_SEARCH:
      return {
        ...state,
        overlay: false,
      };
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        results: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export function toggleSearch() {
  return {
    type: TOGGLE_SEARCH,
  };
}

export function closeSearch() {
  return {
    type: CLOSE_SEARCH,
  };
}

export function load(term) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/feeds/consumer?channels=10&search=${term}&limit=22`)
  };
}
