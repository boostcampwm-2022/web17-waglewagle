import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang='ko'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id='modal-root' />
      </body>
    </Html>
  );
};

export default Document;
