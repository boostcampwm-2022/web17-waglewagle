import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import MyKeyword from './MyKeyword';
import MyKeywordList from './MyKeywordList';
import { GrPowerReset } from 'react-icons/gr';

type keywordProps = {
  keyword: string;
  id: string;
};

const KeywordAddModal = () => {
  const [myKeywordList, setMyKeywordList] = useState<keywordProps[] | []>([]);

  useEffect(() => {
    setMyKeywordList([
      {
        keyword: '논',
        id: '1',
      },
      {
        keyword: '밭',
        id: '2',
      },
    ]);
  }, []);

  return (
    <div>
      <header>
        <h3>세 개 이상 추가해보세요</h3>
        <button>
          <GrPowerReset />
        </button>
      </header>
      <input />
      <button>추가하기</button>
      <div>논</div>
      <Image
        src='/images/window-dog.png'
        width={66}
        height={70}
        alt='추천 키워드를 알려주는 윈도우 도우미 강아지'
      />
      <hr />
      <h4>내 키워드</h4>
      <MyKeywordList>
        {myKeywordList.map((keywordData) => (
          <MyKeyword key={keywordData.id} keyword={keywordData.keyword} />
        ))}
      </MyKeywordList>
    </div>
  );
};

export default KeywordAddModal;
