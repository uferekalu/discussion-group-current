import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import 'tippy.js/dist/tippy.css'
import "@/styles/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import store from "@/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
  );
}
