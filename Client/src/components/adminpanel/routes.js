import index from "views/index";
import adminusers from "views/adminusers";
import adminproducts from "views/adminproducts"


var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: index,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-bullet-list-67 text-red",
    component: adminusers,
    layout: "/admin"
  },
  {
    path: "/productslist",
    name: "ProductsList",
    icon: "ni ni-bag-17 text-red",
    component: adminproducts,
    layout: "/admin"
  },
  
];
export default routes;
