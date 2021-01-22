import { MatxLoadable } from "matx";

const appProfile = MatxLoadable({
  loader: () => import("./AppProfile"),
});

const profileRoutes = [
  {
    path: "/profile",
    component: appProfile,
    exact: true,
  },
];

export default profileRoutes;
