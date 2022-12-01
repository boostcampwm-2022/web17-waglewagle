import { useState } from 'react';
import Thread from './Thread';
import styles from '@sass/components/community/keyword/ThreadList.module.scss';
import classnames from 'classnames/bind';
import { ThreadData } from '../../../types/types';
const cx = classnames.bind(styles);

interface ThreadListProps {
  toggleSidebar(thread: ThreadData): void;
}

const ThreadList = ({ toggleSidebar }: ThreadListProps) => {
  const [threadDataList] = useState<ThreadData[]>([
    {
      id: '1',
      username: '김관경',
      contents:
        '개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!개발 최고!',
      createAt: '2022-12-01T15:02:40.5836619',
      comments: [
        {
          id: '1',
          content: '개발 최고!',
          username: '김관경',
          createAt: '2022-12-01T15:02:40.5836619',
          profileURL: '/images/default-profile.png',
        },
        {
          id: '2',
          content: '개발 최고!',
          username: '김관경',
          createAt: '2022-12-01T15:02:40.5836619',
          profileURL: '/images/default-profile.png',
        },
        {
          id: '3',
          content: '개발 최고!',
          username: '김관경',
          createAt: '2022-12-01T15:02:40.5836619',
          profileURL: '/images/default-profile.png',
        },
      ],
    },
    {
      id: '2',
      username: '문성현',
      contents: '개발 최고!',
      createAt: '2022-12-01T15:02:40.5836619',
      comments: [],
    },
    {
      id: '3',
      username: '김대호',
      contents: '개발 최고!',
      createAt: '2022-12-01T15:02:40.5836619',
      comments: [],
    },
    {
      id: '4',
      username: '이승민',
      contents: '개발 최고!',
      createAt: '2022-12-01T15:02:40.5836619',
      comments: [],
    },
  ]);

  return (
    <ul className={cx('thread-list')}>
      {threadDataList.map(({ id, username, contents, createAt, comments }) => (
        <Thread
          key={id}
          id={id}
          username={username}
          contents={contents}
          createAt={createAt}
          comments={comments}
          toggleSidebar={toggleSidebar}
        />
      ))}
    </ul>
  );
};

export default ThreadList;
