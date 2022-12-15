import { useEffect, useState } from 'react';
import Image from 'next/image';
import classnames from 'classnames/bind';
import { Loading } from '@components/common';
import { RELATED_KEYWORD_NUMBERS } from '@constants/constants';
import { useRelatedKeywordList } from '@hooks/keyword';
import type { KeywordRelatedData, MyKeywordData } from '#types/types';
import styles from '@sass/components/community/keyword-add-modal/KeywordAssociated.module.scss';

const cx = classnames.bind(styles);

interface KeywordAssociatedProps {
  prevKeyword?: MyKeywordData;
}

// 나중에 common으로 분리될 수 있다.
const KeywordAssociated = ({ prevKeyword }: KeywordAssociatedProps) => {
  const [slicedRelated, setSliceRelated] = useState<KeywordRelatedData[]>([]);
  const { data: relatedKeywordList, isLoading } =
    useRelatedKeywordList(prevKeyword);

  useEffect(() => {
    setSliceRelated(
      relatedKeywordList.slice(0, RELATED_KEYWORD_NUMBERS.KEYWORD_ADD_MODAL),
    );
  }, [relatedKeywordList]);

  return (
    <div className={cx('container')}>
      <section className={cx('keyword-section')}>
        {prevKeyword && (
          <div className={cx('chat-bubble')}>
            <b>&apos;{prevKeyword.keywordName}&apos;</b>을 추가하셨다면 이런
            키워드는 어떠신가요?
          </div>
        )}
        <ul>
          {isLoading && <Loading />}
          {slicedRelated.map((keyword) => (
            <li key={keyword.keywordId}>{keyword.keywordName}</li>
          ))}
        </ul>
      </section>
      <section className={cx('image-section')}>
        <Image
          src='/images/window-dog.png'
          width={76}
          height={80}
          alt='추천 키워드를 알려주는 강아지 캐릭터'
        />
      </section>
    </div>
  );
};

export default KeywordAssociated;
