import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "@/styles/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import store from "@/store";
import ProtectedRoute from "@/utils/ProtectedRoute";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
  );
}
