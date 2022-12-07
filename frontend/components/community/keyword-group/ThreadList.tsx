import { ThreadData } from '#types/types';
import useThreadListQuery from '@hooks/useThreadListQuery';
import styles from '@sass/components/community/keyword/ThreadList.module.scss';
import classnames from 'classnames/bind';
import Thread from './Thread';
const cx = classnames.bind(styles);

interface ThreadListProps {
  openSidebar(thread: ThreadData): void;
}

const ThreadList = ({ openSidebar }: ThreadListProps) => {
  const { data: threadDataList } = useThreadListQuery('123');

  return (
    <ul className={cx('thread-list')}>
      {threadDataList?.map((threadData) => (
        <Thread
          key={threadData.threadId}
          {...threadData}
          openSidebar={openSidebar}
        />
      ))}
    </ul>
  );
};

export default ThreadList;
