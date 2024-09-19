import RootLayout from "~/layouts/RootLayout";
import { AppProps } from "next/app";
import { NextComponentType, NextPageContext } from "next";
import "~/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "~/store";

type AppPropsWithLayout = AppProps & {
  Component: NextComponentType<NextPageContext, any, any> & {
    PageLayout?: React.ComponentType<{ children: React.ReactNode }>;
  };
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <Provider store={store}>
      <RootLayout>
        {Component.PageLayout ? (
          <Component.PageLayout>
            <Component {...pageProps} />
          </Component.PageLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </RootLayout>
    </Provider>
  );
}
