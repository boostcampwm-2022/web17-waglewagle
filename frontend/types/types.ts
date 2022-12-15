import Circle from '../utils/circlepacker/Circle';

export type MyKeywordData = {
  keywordId: string;
  keywordName: string;
};

export type KeywordData = {
  keywordId: string;
  keywordName: string;
  memberCount: number;
};

export type AddKeywordData = {
  keywordName: string;
  communityId: string;
};

export type JoinKeywordData = {
  keywordId: string;
  communityId: string;
};

export type DisjoinKeywordData = {
  keywordId: string;
  communityId: string;
};

// TODO: 그냥 rank를 옵셔널로 넣을까
export type KeywordRelatedData = {
  keywordId: string;
  keywordName: string;
  memberCount: number;
  rank: number;
};

export type BubbleData = {
  keywordId: string;
  keyword: string;
  count: number;
  circle: Circle;
  isJoined: boolean;
};

export type UserData = {
  userId: string;
  username: string;
  profileImageUrl: string | null;
  role: 'ADMIN' | 'USER' | 'MANAGER' | 'GUEST';
  isFirstInCommunity: boolean | null;
};

export type CommunityData = {
  communityId: string;
  title: string;
  description: string;
};

export type Author = {
  userId: string;
  username: string;
  profileImageUrl: string;
};

export type KeywordGroupData = {
  keywordId: string;
  keyword: string;
};

export type ThreadData = {
  threadId: string;
  content: string;
  childThreadCount: number;
  childThreads: ThreadData[];
  createdAt: string;
  updatedAt: string;
  author: Author;
};

export type KeywordUser = {
  userId: string;
  username: string;
  profileImageUrl: string;
  lastActivity: string;
};

export type ClickPosData = {
  x: number;
  y: number;
};
