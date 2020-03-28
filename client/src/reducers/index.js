import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import user from './user';
import projects from './projects';

export default combineReducers({
  alert,
  auth,
  user,
  projects
});
