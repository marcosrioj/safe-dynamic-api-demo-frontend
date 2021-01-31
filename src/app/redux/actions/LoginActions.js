import jwtAuthService from "../../services/jwtAuthService";
import { setUserData } from "./UserActions";
import history from "history.js";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";

export function loginWithEmailAndPassword({ email, password }) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_LOADING,
    });

    jwtAuthService
      .loginWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(setUserData(user));

        history.push({
          pathname: "/",
        });

        return dispatch({
          type: LOGIN_SUCCESS,
        });
      })
      .catch((error) => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error,
        });
      });
  };
}

export function loginExternal(token) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_LOADING,
    });

    jwtAuthService
      .loginWithTokenFirstTime(token)
      .then((user) => {
        dispatch(setUserData(user));

        history.push({
          pathname: "/",
        });

        return dispatch({
          type: LOGIN_SUCCESS,
        });
      })
      .catch((error) => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error,
        });
      });
  };
}
