import {combineReducers} from 'redux';
import {imageSearchReducer} from './imageSearchReducer';

export const rootReducer = combineReducers({
  imageSearchReducer,
});
