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
