import '@sass/globals.scss';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState<QueryClient>(() => new QueryClient());
  return (
    <>
      <Script
        async
        src='https://d-collect.jennifersoft.com/c0bb5fef/demian.js'
      />
      <Script id='jennifer-frontend'>
        {`
    (function(j,ennifer) {
      j['dmndata']=[];j['jenniferFront']=function(args){window.dmndata.push(args)};
      j['dmnaid']=ennifer;j['dmnatime']=new Date();j['dmnanocookie']=false;j['dmnajennifer']='JENNIFER_FRONT@INTG';
  }(window, 'c0bb5fef'));
        `}
      </Script>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

export default App;
