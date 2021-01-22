import {
  GET_NOTIFICATION,
  CREATE_NOTIFICATION,
  DELETE_ALL_NOTIFICATION,
  DELETE_NOTIFICATION,
  SET_NOTIFICATION_TOTAL_COUNT,
} from "../actions/NotificationActions";

const initialState = { totalCount: 0, data: [] };

const NotificationReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_NOTIFICATION_TOTAL_COUNT: {
      return { ...state, ...action.payload };
    }
    case GET_NOTIFICATION: {
      return { ...state, ...action.payload };
    }
    case CREATE_NOTIFICATION: {
      return { ...state, ...action.payload };
    }
    case DELETE_NOTIFICATION: {
      return { ...state, ...action.payload };
    }
    case DELETE_ALL_NOTIFICATION: {
      return { ...state, ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default NotificationReducer;
