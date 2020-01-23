import Index from "views/Index";
import Profile from "views/examples/Profile";
import Users from "views/examples/Users";
import ProductsList from "views/examples/ProductsList"


var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-bullet-list-67 text-red",
    component: Users,
    layout: "/admin"
  },
  {
    path: "/productslist",
    name: "ProductsList",
    icon: "ni ni-bag-17 text-red",
    component: ProductsList,
    layout: "/admin"
  },
  
];
export default routes;
