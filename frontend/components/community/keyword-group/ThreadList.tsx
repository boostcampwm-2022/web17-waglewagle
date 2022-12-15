import classnames from 'classnames/bind';
import Thread from '@components/community/keyword-group/Thread';
import { useThreadListQuery } from '@hooks/thread';
import styles from '@sass/components/community/keyword-group/ThreadList.module.scss';
const cx = classnames.bind(styles);

interface ThreadListProps {
  keywordId: string;
  openSidebar(threadId: string): void;
}

const ThreadList = ({ keywordId, openSidebar }: ThreadListProps) => {
  const { data: threadDataList } = useThreadListQuery(keywordId);

  return (
    <ul className={cx('thread-list')}>
      {threadDataList &&
        threadDataList?.map((threadData) => (
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
