import { MatxLoadable } from "matx";

const appCampaign = MatxLoadable({
  loader: () => import("./AppCampaign"),
});

const campaignRoutes = [
  {
    path: "/campaigns",
    component: appCampaign,
    exact: true,
  },
];

export default campaignRoutes;
