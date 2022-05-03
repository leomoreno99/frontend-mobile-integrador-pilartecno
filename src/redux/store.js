import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { functionalitiesReducer, notificationsReducer, placesReducer } from "./appRedux";

const rootReducers = combineReducers({
  placesReducer: placesReducer,
  notificationsReducer: notificationsReducer,
  functionalitiesReducer: functionalitiesReducer
});

const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;
