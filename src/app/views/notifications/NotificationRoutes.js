import { MatxLoadable } from "matx";

const appNotification = MatxLoadable({
  loader: () => import("./AppNotification"),
});

const notificationRoutes = [
  {
    path: "/notifications",
    component: appNotification,
    exact: true,
  },
];

export default notificationRoutes;
