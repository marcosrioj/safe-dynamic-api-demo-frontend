import { MatxLoadable } from "matx";

const appOrder = MatxLoadable({
  loader: () => import("./AppOrder"),
});

const orderRoutes = [
  {
    path: "/orders",
    component: appOrder,
    exact: true,
  },
];

export default orderRoutes;
