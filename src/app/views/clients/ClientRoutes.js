import { MatxLoadable } from "matx";

const appClient = MatxLoadable({
  loader: () => import("./AppClient"),
});

const clientRoutes = [
  {
    path: "/clients",
    component: appClient,
    exact: true,
  },
];

export default clientRoutes;
