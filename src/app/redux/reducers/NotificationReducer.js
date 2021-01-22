import {
  GET_NOTIFICATION,
  CREATE_NOTIFICATION,
  DELETE_ALL_NOTIFICATION,
  DELETE_NOTIFICATION,
  SET_NOTIFICATIONS_DATA,
} from "../actions/NotificationActions";

const initialState = [];

const NotificationReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_NOTIFICATIONS_DATA: {
      return [...action.payload];
    }
    case GET_NOTIFICATION: {
      return [...action.payload];
    }
    case CREATE_NOTIFICATION: {
      return [...action.payload];
    }
    case DELETE_NOTIFICATION: {
      return [...action.payload];
    }
    case DELETE_ALL_NOTIFICATION: {
      return [...action.payload];
    }
    default: {
      return [...state];
    }
  }
};

export default NotificationReducer;
