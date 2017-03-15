const TOGGLE_MENU = 'menu/TOGGLE_SEARCH';
const CLOSE_MENU = 'menu/CLOSE_MENU';

const initialState = {
  toggled: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        toggled: !state.toggled,
      };
    case CLOSE_MENU:
      return {
        ...state,
        toggled: false,
      };
    default:
      return state;
  }
}

export function toggleMenu() {
  return {
    type: TOGGLE_MENU,
  };
}

export function closeMenu() {
  return {
    type: CLOSE_MENU,
  };
}
