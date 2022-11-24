import Circle from '../circlepacker/Circle';

export type KeywordData = {
  keywordId: string;
  keyword: string;
  count: number;
};

export type BubbleData = {
  keyword: string;
  count: number;
  circle: Circle;
};
