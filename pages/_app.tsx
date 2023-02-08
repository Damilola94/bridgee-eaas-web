import {
  ReactElement, ReactNode, useState, useEffect
} from 'react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';

import { ReactNotifications } from 'react-notifications-component';
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import '../styles/globals.css';
import '../styles/sidebar.scss';
import '../styles/calendar.scss';
import '../styles/inputs.scss';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false
      }
    }
  }));
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  if (!pageLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactNotifications />
        {getLayout(<Component {...pageProps} />)}
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}
