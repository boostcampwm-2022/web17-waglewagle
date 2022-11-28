import '@sass/globals.scss';
import type { AppProps } from 'next/app';
import Script from 'next/script';

const App = ({ Component, pageProps }: AppProps) => {
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
      <Component {...pageProps} />
    </>
  );
};

export default App;
