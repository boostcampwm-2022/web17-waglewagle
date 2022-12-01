import Circle from '../circlepacker/Circle';

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
