import { MatxLoadable } from "matx";

const appProduct = MatxLoadable({
  loader: () => import("./AppProduct"),
});

const productRoutes = [
  {
    path: "/products",
    component: appProduct,
    exact: true,
  },
];

export default productRoutes;
