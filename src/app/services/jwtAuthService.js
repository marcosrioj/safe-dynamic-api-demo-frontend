import axios from "axios";

import { BACKEND_URL } from "appSettings";
import localStorageService from "./localStorageService";

class JwtAuthService {
  // You need to send http request with email and passsword to your server in this method
  // Your server will return user object & a Token
  // User should have role property
  // You can define roles in app/auth/authRoles.js
  loginWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${BACKEND_URL}/auth/login`, { email, password })
        .then((res) => {
          if (res.data.access_token) {
            this.setSession(res.data.access_token);

            axios.post(`${BACKEND_URL}/auth/me`).then((res2) => {
              if (res2.data.id) {
                resolve({
                  userId: res2.data.id,
                  role: res2.data.type,
                  displayName: res2.data.name,
                  email: res2.data.email,
                  photoURL: res2.data.avatar,
                  token: res.data.access_token,
                });
              } else {
                reject(res2);
              }
            });
          } else {
            reject(res);
          }
        });
    }).then((data) => {
      // Login successful
      // Set user
      this.setUser(data);
      return data;
    });
  };

  // You need to send http requst with existing token to your server to check token is valid
  // This method is being used when user logged in & app is reloaded
  loginWithToken = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = localStorageService.getItem("auth_user");
        resolve(user);
      }, 100);
    }).then((data) => {
      // Token is valid
      this.setSession(data.token);
      this.setUser(data);
      return data;
    });
  };

  logout = () => {
    this.setSession(null);
    this.removeUser();
  };

  // Set token to all http request header, so you don't need to attach everytime
  setSession = (token) => {
    if (token) {
      localStorage.setItem("jwt_token", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      localStorage.removeItem("jwt_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // Save user to localstorage
  setUser = (user) => {
    localStorageService.setItem("auth_user", user);
  };

  // Remove user from localstorage
  removeUser = () => {
    localStorage.removeItem("auth_user");
  };
}

export default new JwtAuthService();
