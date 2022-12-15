import { useMemo } from 'react';
import classnames from 'classnames/bind';
import { useKeywordUserListQuery } from '@hooks/keyword';
import calculateTimeGap from '@utils/calculateTimeGap';
import styles from '@sass/components/community/keyword-group/KeywordUserList.module.scss';
const cx = classnames.bind(styles);

interface KeywordGroupUserListProps {
  keywordId: string;
  keyword: string;
}

const KeywordGroupUserList = ({
  keywordId,
  keyword,
}: KeywordGroupUserListProps) => {
  const { data: userList } = useKeywordUserListQuery(keywordId);

  const onlineUserCount = useMemo(
    () =>
      userList?.reduce(
        (result, { lastActivity }) =>
          calculateTimeGap(lastActivity) === '방금 전' ? result + 1 : result,
        0,
      ),
    [userList],
  );

  return (
    <div className={cx('layout')}>
      <div className={cx('header')}>
        <h3 className={cx('title')}>{keyword}</h3>
        <p className={cx('online-count')}>
          {onlineUserCount}명이 이야기 나누는 중
        </p>
      </div>
      <ul>
        {userList
          ?.sort((a, b) => (a.lastActivity < b.lastActivity ? 1 : -1))
          .map(({ userId, username, lastActivity }) => (
            <li key={userId} className={cx('user-list')}>
              <p className={cx('username')}>{username}</p>
              {calculateTimeGap(lastActivity) === '방금 전' ? (
                <div className={cx('online-badge')}></div>
              ) : (
                calculateTimeGap(lastActivity)
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default KeywordGroupUserList;
