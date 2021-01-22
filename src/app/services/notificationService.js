import axios from "axios";

import { BACKEND_URL } from "appSettings";

class NotificationService {
  getNotificationsCount = () => {
    return axios
      .get(`${BACKEND_URL}/dynamicapi/records/notifications?page=1,0`)
      .then((res) => {
        return res.data.results;
      });
  };
}

export default new NotificationService();
