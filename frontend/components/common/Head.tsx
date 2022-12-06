import Head from 'next/head';

interface SeoHeadProps {
  title: string;
  description: string;
  url: string;
}

const SeoHead = ({ title, description, url }: SeoHeadProps) => {
  return (
    <Head>
      <title>{title || '와글와글 | 소모임 시각화'}</title>
      <meta
        name='description'
        content={
          description ||
          '데이터 시각화를 통한 중규모 커뮤니티 소모임 관리 서비스'
        }
      />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta property='og:title' content={title || '와글와글 | 소모임 시각화'} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={url || 'https://waglewagle.link'} />
      <meta property='og:image' content='../../public/images/waglewagle.jpeg' />
      <meta property='og:article:author' content='와글와글 | 소모임 시각화' />
    </Head>
  );
};

export default SeoHead;
