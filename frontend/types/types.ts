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

export type AddKeywordResponseData = {
  keywordId: string;
  keywordName: string;
};

export type JoinKeywordData = {
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
  keyword: string;
  count: number;
  circle: Circle;
};

export type UserData = {
  userId: string;
  username: string;
  profileImageUrl: string | null;
};

export type Author = {
  userId: string;
  username: string;
  profileImageUrl: string;
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
