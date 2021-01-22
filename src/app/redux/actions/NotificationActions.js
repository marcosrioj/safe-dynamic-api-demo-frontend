import axios from "axios";

import { BACKEND_URL } from "appSettings";

export const GET_NOTIFICATION = "GET_NOTIFICATION";
export const CREATE_NOTIFICATION = "CREATE_NOTIFICATION";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const DELETE_ALL_NOTIFICATION = "DELETE_ALL_NOTIFICATION";
export const SET_NOTIFICATIONS_DATA = "SET_NOTIFICATIONS_DATA";

const notificationUrl = `${BACKEND_URL}/dynamicapi/records/notifications`;

export function setNotificationsData(notifications) {
  return (dispatch) => {
    dispatch({
      type: SET_NOTIFICATIONS_DATA,
      payload: notifications,
    });
  };
}

export const getNotification = () => (dispatch) => {
  axios.get(notificationUrl).then((res) => {
    dispatch({
      type: GET_NOTIFICATION,
      payload: res.data.records,
    });
  });
};

export const deleteNotification = (id) => (dispatch) => {
  axios.delete(`${notificationUrl}/${id}`).then((res) => {
    dispatch({
      type: DELETE_NOTIFICATION,
      payload: res.data,
    });
  });
};

export const deleteAllNotification = () => (dispatch) => {
  axios.get(`${notificationUrl}?include=id`).then((res) => {
    if (res.data.records && res.data.records.length > 0) {
      let idsToDeleteUrl = `${notificationUrl}/`;

      for (var i in res.data.records) {
        const id = res.data.records[i].id;
        idsToDeleteUrl += `${id},`;
      }
      axios.delete(idsToDeleteUrl).then((res) => {
        dispatch({
          type: DELETE_ALL_NOTIFICATION,
          payload: [],
        });
      });
    }
  });
};

export const createNotification = (notification) => (dispatch) => {
  axios.post(notificationUrl, notification).then((res) => {
    dispatch({
      type: CREATE_NOTIFICATION,
      payload: res.data,
    });
  });
};
