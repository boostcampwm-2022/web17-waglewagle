import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head>
        <title>와글와글</title>
        <link
          href='https://hangeul.pstatic.net/hangeul_static/css/NanumBugGeugSeong.css'
          rel='stylesheet'
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id='modal-root' />
      </body>
    </Html>
  );
};

export default Document;
