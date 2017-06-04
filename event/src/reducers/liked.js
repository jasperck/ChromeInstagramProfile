import {
  SET_LIKED,
  UPDATE_LIKED,
  RESET_LIKED
} from '../actions';

const initialState = {
  more_available: false,
  next_max_id: null,
  auto_load_more_enabled: false,
  num_results: 0,
  items: []
};

export const liked = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIKED:
    case UPDATE_LIKED:
      return {
        ...state,
        ...action.data,
        items: [...state.items, ...action.data.items],
      };
    case RESET_LIKED:
      return {
        ...initialState
      };
    default:
      return state;
  }
};