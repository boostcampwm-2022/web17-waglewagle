import { useState } from 'react';
import Thread from './Thread';
import styles from '@sass/components/community/keyword/ThreadList.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const ThreadList = () => {
  const [threadDataList] = useState<
    {
      id: string;
      profileURL?: string;
      username: string;
      createAt: number;
      contents: string;
      comments: [];
    }[]
  >([
    {
      id: '1',
      username: '김관경',
      contents: '개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!',
      createAt: 201020,
      comments: [],
    },
    {
      id: '2',
      username: '문성현',
      contents: '개발 최고!',
      createAt: 201020,
      comments: [],
    },
    {
      id: '3',
      username: '김대호',
      contents: '개발 최고!',
      createAt: 201020,
      comments: [],
    },
    {
      id: '4',
      username: '이승민',
      contents: '개발 최고!',
      createAt: 201020,
      comments: [],
    },
  ]);

  return (
    <ul className={cx('thread-list')}>
      {threadDataList.map(({ id, username, contents, createAt, comments }) => (
        <Thread
          key={id}
          username={username}
          contents={contents}
          createAt={createAt}
          comments={comments}
        />
      ))}
    </ul>
  );
};

export default ThreadList;
