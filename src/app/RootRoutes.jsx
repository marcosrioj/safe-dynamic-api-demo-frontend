import React from "react";
import { Redirect } from "react-router-dom";

import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";

import materialRoutes from "./views/material-kit/MaterialRoutes";

import clientRoutes from "./views/clients/ClientRoutes";
import productRoutes from "./views/products/ProductRoutes";
import notificationRoutes from "./views/notifications/NotificationRoutes";
import campaignRoutes from "./views/campaigns/CampaignRoutes";
import orderRoutes from "./views/orders/OrderRoutes";

import profileRoutes from "./views/profile/ProfileRoutes";

import formsRoutes from "./views/forms/FormsRoutes";
import mapRoutes from "./views/map/MapRoutes";

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard/analytics" />,
  },
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />,
  },
];

const routes = [
  ...sessionRoutes,
  ...dashboardRoutes,
  ...materialRoutes,
  ...clientRoutes,
  ...productRoutes,
  ...notificationRoutes,
  ...campaignRoutes,
  ...orderRoutes,
  ...profileRoutes,
  ...formsRoutes,
  ...mapRoutes,
  ...redirectRoute,
  ...errorRoute,
];

export default routes;
