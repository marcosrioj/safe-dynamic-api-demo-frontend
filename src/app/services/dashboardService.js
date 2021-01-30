import axios from "axios";

import { BACKEND_URL } from "appSettings";

class DashboardService {
  getYearSalesByMonth = () => {
    return axios
      .get(`${BACKEND_URL}/dynamicapi/records/year_sales_by_month`)
      .then((res) => {
        if (res.data && res.data.records) {
          return res.data.records.length > 0 ? res.data.records[0] : null;
        } else {
          // eslint-disable-next-line no-throw-literal
          throw "GetYearSalesByMonth Data Loading Error";
        }
      });
  };

  getGeneralStats = () => {
    return axios
      .get(`${BACKEND_URL}/dynamicapi/records/general_stats`)
      .then((res) => {
        if (res.data && res.data.records) {
          return res.data.records.length > 0 ? res.data.records[0] : null;
        } else {
          // eslint-disable-next-line no-throw-literal
          throw "GetGeneralStats Data Loading Error";
        }
      });
  };

  getCampaignsStats = () => {
    return axios
      .get(`${BACKEND_URL}/dynamicapi/records/campaigns_stats`)
      .then((res) => {
        if (res.data && res.data.records) {
          return res.data.records;
        } else {
          // eslint-disable-next-line no-throw-literal
          throw "GetCampaignsStats Data Loading Error";
        }
      });
  };

  getTop5Sales = () => {
    return axios
      .get(`${BACKEND_URL}/dynamicapi/records/top5_products`)
      .then((res) => {
        if (res.data && res.data.records) {
          return res.data.records;
        } else {
          // eslint-disable-next-line no-throw-literal
          throw "GetCampaignsStats Data Loading Error";
        }
      });
  };
}

export default new DashboardService();
