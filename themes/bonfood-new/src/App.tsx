import I18NInitializer from "@i18n/index";
import AppRoutes from "@init-src/components/AppRoutes";
import AuthProvider from "@init-src/components/AuthProvider";
import BreadcrumbsProvider from "@init-src/components/BreadcrumbsProvider";
import LoaderScreen from "@init-src/components/LoaderScreen";
import PageRefresher from "@init-src/components/PageRefresher";
import PrivateRouteRedirector from "@init-src/components/PrivateRouteRedirector";
import ProgressBar from "@init-src/components/ProgressBar";
import RouteTransitionDeferrer from "@init-src/components/RouteTransitionDeferrer";
import ScrollController from "@init-src/components/ScrollController";
import ToastRingInitializer from "@init-src/components/ToastRingInitializer";
import useLocalStorage from "@init-src/hooks/useLocalStorage";
import StoreInitializer from "@init-src/stores/StoreInitializer";
import { routes } from "@bonfood-new-src/routes";
import { usePage } from "@ssr-client/index";
import i18next, { type i18n } from "i18next";
import { I18nextProvider } from "react-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/MainLayouts";

function App({ i18n }: { i18n?: i18n }) {
  const page = usePage();
  const [loaderHorizontal] = useLocalStorage({
    key: "loader-horizontal",
    initialValue: false,
  });
  const [loader] = useLocalStorage({ key: "loader", initialValue: false });

  return (
    <I18nextProvider i18n={i18n || i18next}>
      <AuthProvider>
        <BreadcrumbsProvider
          separator="-"
          className="text-gray-400 font-medium"
          lastClassName="text-gray-800 font-bold"
          routes={routes}
        >
          <MainLayout>
            <ToastContainer position="bottom-right" autoClose={5000} />
            <ScrollController />
            <ToastRingInitializer />
            {loader && <LoaderScreen horizontal={!!loaderHorizontal} />}
            <I18NInitializer>
              <StoreInitializer page={page}>
                <RouteTransitionDeferrer>
                  <PageRefresher>
                    <PrivateRouteRedirector routes={routes}>
                      <ProgressBar>
                        <AppRoutes routes={routes} />
                      </ProgressBar>
                    </PrivateRouteRedirector>
                  </PageRefresher>
                </RouteTransitionDeferrer>
              </StoreInitializer>
            </I18NInitializer>
          </MainLayout>
        </BreadcrumbsProvider>
      </AuthProvider>
    </I18nextProvider>
  );
}

export default App;
