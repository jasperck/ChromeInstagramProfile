import {SET_LIKED} from '../actions';

const initialState = {
  items: []
};

export const liked = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIKED:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};