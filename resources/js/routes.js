import Home from "./views/Home";
import CoinDetail from "./views/CoinDetail";

const routes = [
  {
    path: "/",
    component: Home,
    name: "Home",
  },
  {
    path: "/coin/:id",
    component: CoinDetail,
    name: "CoinDetail",
  },
];

export default routes;
