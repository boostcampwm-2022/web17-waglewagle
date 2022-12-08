import Thread from '@components/community/keyword-group/Thread';
import useThreadListQuery from '@hooks/useThreadListQuery';
import styles from '@sass/components/community/keyword/ThreadList.module.scss';
import classnames from 'classnames/bind';
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
