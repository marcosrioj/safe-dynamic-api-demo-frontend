import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const Analytics = MatxLoadable({
  loader: () => import("./Analytics")
})

const dashboardRoutes = [
  {
    path: "/dashboard/analytics",
    component: Analytics,
    auth: authRoles.user
  }
];

export default dashboardRoutes;
