import {SEARCH_COMPLETED, SEARCH_STARTED} from '../actions/searchActions';

const initialState = {
  isLoading: false,
  data: [],
};

export const imageSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_STARTED:
      return {...state, isLoading: true};

    case SEARCH_COMPLETED:
      return {...state, isLoading: false, data: action.payload};

    default:
      return state;
  }
};
