import {combineReducers} from 'redux';
import {loginReducer} from '../features/login/redux/reducer';
import {signupReducer} from '../features/signup/redux/reducer';
import {UserFeatureState, UserFeatureStateDataUsers} from '../../../redux/state.types';

export const ACTION_RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';

export const userReducer =
                 combineReducers<UserFeatureState>(
                     {
                         enabled:  (state, action) => true,
                         features: combineReducers({
                                                       login:  loginReducer,
                                                       signup: signupReducer,
                                                   }),
                         data:     combineReducers({
                                                       users: (state: UserFeatureStateDataUsers = {
                                                           lastFetched: null,
                                                           list:        [],
                                                       }, action) => {
                                                           switch (action.type) {
                                                               case ACTION_RECEIVE_ALL_USERS:
                                                                   return {
                                                                       ...state,
                                                                       list:        action.payload,
                                                                       lastFetched: Date.now(),
                                                                   }
                                                           }
                                                           return state;
                                                       },
                                                   }),
                     },
                 );