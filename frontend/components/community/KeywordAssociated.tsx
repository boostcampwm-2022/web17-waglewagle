import Image from 'next/image';
import styles from '@sass/components/community/KeywordAssociated.module.scss';
import classnames from 'classnames/bind';
import { KeywordRelatedData } from '../../types/types';
const cx = classnames.bind(styles);

interface KeywordAssociatedProps {
  prevAddedKeyword: string;
  relatedKeywordList: KeywordRelatedData[];
}

// 나중에 common으로 분리될 수 있다.
const KeywordAssociated = ({
  prevAddedKeyword,
  relatedKeywordList,
}: KeywordAssociatedProps) => {
  return (
    <div className={cx('container')}>
      <section className={cx('keyword-section')}>
        <div className={cx('chat-bubble')}>{prevAddedKeyword}</div>
        <ul>
          {relatedKeywordList.map((keyword) => (
            <li key={keyword.keywordId}>{keyword.keywordName}</li>
          ))}
        </ul>
      </section>
      <section className={cx('image-section')}>
        <Image
          src='/images/window-dog.png'
          width={66}
          height={70}
          alt='추천 키워드를 알려주는 강아지 캐릭터'
        />
      </section>
    </div>
  );
};

export default KeywordAssociated;
