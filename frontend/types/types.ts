import Circle from '../circlepacker/Circle';

export type KeywordData = {
  keywordId: string;
  keywordName: string;
  memberCount: number;
};

export type BubbleData = {
  keyword: string;
  count: number;
  circle: Circle;
};

export type CommentData = {
  id: string;
  content: string;
  username: string;
  createAt: string;
  profileURL?: string;
};

export type ThreadData = {
  id: string;
  profileURL?: string;
  username: string;
  createAt: string;
  contents: string;
  comments: CommentData[];
};
