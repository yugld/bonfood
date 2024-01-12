import NotFound from "@bonfood-new-src/components/NotFound";
import AboutPage from "@bonfood-new-src/pages/about/AboutPage";
import ContactsPage from "@bonfood-new-src/pages/contacts/ContactsPage";
import HomePage from "@bonfood-new-src/pages/home/HomePage";
import { RouteType } from "@init-src/components/AppRoutes";
import LoginPage from "@init-src/pages/auth/LoginPage";
import RegisterPage from "@init-src/pages/auth/RegisterPage";
import RestorePage from "@init-src/pages/auth/RestorePage";
import CartPage from "@init-src/pages/cart/CartPage";
import DashbaordEditPage from "@init-src/pages/dashboard/DashboardEditPage";
import DashbaordHistoryPage from "@init-src/pages/dashboard/DashboardHistoryPage";
import DashbaordPage from "@init-src/pages/dashboard/DashboardPage";
import FavoritesPage from "@init-src/pages/favorites/FavoritesPage";
import OrdersPage from "@init-src/pages/orders/OrdersPage";

export const routes: RouteType[] = [
  {
    path: "/",
    name: "home",
    getElement: () => <HomePage />,
    addLngPrefix: true,
  },
  {
    path: "/about",
    name: "about",
    getElement: () => <AboutPage />,
    addLngPrefix: true,
  },
  {
    path: "/contacts",
    name: "contacts",
    getElement: () => <ContactsPage />,
    addLngPrefix: true,
  },
  {
    path: "/orders",
    name: "orders",
    getElement: () => <OrdersPage />,
    addLngPrefix: true,
    privateRoute: true,
  },
  {
    path: "/orders/:slug",
    name: "orders",
    getElement: () => <OrdersPage />,
    addLngPrefix: true,
    privateRoute: true,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    getElement: () => <DashbaordPage />,
    addLngPrefix: true,
    privateRoute: true,
  },
  {
    path: "/dashboard/edit",
    name: "edit-profile",
    getElement: () => <DashbaordEditPage />,
    addLngPrefix: true,
    privateRoute: true,
  },
  {
    path: "/dashboard/history",
    name: "dashboard-history",
    getElement: () => <DashbaordHistoryPage />,
    addLngPrefix: true,
    privateRoute: true,
  },
  {
    path: "/fav",
    name: "favorites",
    getElement: () => <FavoritesPage />,
    addLngPrefix: true,
  },
  {
    path: "/login",
    name: "login",
    getElement: () => <LoginPage />,
    addLngPrefix: true,
  },
  {
    path: "/register",
    name: "register",
    getElement: () => <RegisterPage />,
    addLngPrefix: true,
  },
  {
    path: "/restore",
    name: "restore",
    getElement: () => <RestorePage />,
    addLngPrefix: true,
  },
  {
    path: "/cart",
    name: "cart",
    getElement: () => <CartPage />,
    addLngPrefix: true,
  },
  {
    path: "/not-found",
    name: "not-found",
    getElement: () => <NotFound />,
    addLngPrefix: false,
  },
  {
    path: "*",
    name: "catch-all",
    getElement: () => <NotFound />,
    addLngPrefix: false,
  },
];
