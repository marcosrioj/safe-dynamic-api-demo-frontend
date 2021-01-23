import history from "history.js";
import jwtAuthService from "../../services/jwtAuthService";
import localStorageService from "../../services/localStorageService";
import { createAvatarUrl } from "utils";

export const SET_USER_DATA = "USER_SET_DATA";
export const GET_USER_DATA = "USER_GET_DATA";
export const REMOVE_USER_DATA = "USER_REMOVE_DATA";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";

export function setUserData(user) {
  return (dispatch) => {
    dispatch({
      type: SET_USER_DATA,
      data: user,
    });
  };
}

export function getUser() {
  return (dispatch) => {
    const user = localStorageService.getItem("auth_user");
    user.photoURL = createAvatarUrl(user.photo);

    dispatch({
      type: GET_USER_DATA,
      payload: user,
    });
  };
}

export function logoutUser() {
  return (dispatch) => {
    jwtAuthService.logout();

    history.push({
      pathname: "/session/signin",
    });

    dispatch({
      type: USER_LOGGED_OUT,
    });
  };
}
