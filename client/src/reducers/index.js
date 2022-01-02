import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import errorReducer from './error.reducer';

export default combineReducers({
  userReducer,
  usersReducer,
  errorReducer
});