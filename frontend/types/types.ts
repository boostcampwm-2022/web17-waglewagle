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

// TODO: 그냥 rank를 옵셔널로 넣을까
export type KeywordAssociationData = {
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
