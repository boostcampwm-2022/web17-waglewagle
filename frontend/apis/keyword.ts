import { instance } from '@apis/instance';
import type {
  KeywordData,
  KeywordRelatedData,
  KeywordUser,
  MyKeywordData,
} from '#types/types';
import type { AxiosResponse } from 'axios';

const getKeywords = (
  keywordId: string,
): Promise<AxiosResponse<KeywordData[]>> =>
  instance.get(`/v1/keyword/${keywordId}`);

const getKeywordAssociations = (
  keywordId: string,
): Promise<AxiosResponse<KeywordRelatedData[]>> =>
  instance.get('/v1/keyword/associations', {
    params: {
      'keyword-id': keywordId,
    },
  });

const getMyKeywordList = (
  communityId: string,
): Promise<AxiosResponse<MyKeywordData[]>> =>
  instance.get(`/v1/keyword/user/${communityId}`);

const getKeywordUsers = (
  keywordId: string,
): Promise<AxiosResponse<KeywordUser[]>> =>
  instance.get('/v1/user/keyword', {
    params: { 'keyword-id': keywordId },
  });

type AddKeywordRequestBody = {
  keywordName: string;
  communityId: string;
};

const addKeyword = (
  addKeywordRequestBody: AddKeywordRequestBody,
): Promise<AxiosResponse<MyKeywordData>> =>
  instance.post('/v1/keyword', addKeywordRequestBody);

type JoinKeywordRequestBody = {
  keywordId: string;
  communityId: string;
};

const joinKeyword = (joinRequestBody: JoinKeywordRequestBody) =>
  instance.post('/v1/keyword/join', joinRequestBody);

type DisjoinKeywordRequestBody = {
  keywordId: string;
  communityId: string;
};

const disjoinKeyword = (disjoinKeywordRequestBody: DisjoinKeywordRequestBody) =>
  instance.delete('/v1/keyword/disjoin', {
    data: disjoinKeywordRequestBody,
  });

type DeleteKeywordRequestBody = {
  communityId: string;
  keywordIdList: string[];
};

const deleteKeyword = (deleteKeywordRequestBody: DeleteKeywordRequestBody) =>
  instance.delete('/v1/keyword', {
    data: deleteKeywordRequestBody,
  });

type MergeKeywordRequestBody = {
  communityId: string;
  destinationKeywordId: string;
  sourceKeywordIdList: string[];
};

const mergeKeyword = (mergeKeywordRequestBody: MergeKeywordRequestBody) =>
  instance.put('/v1/keyword/merge', mergeKeywordRequestBody);

export const keyword = {
  getKeywords,
  getKeywordAssociations,
  getMyKeywordList,
  getKeywordUsers,
  addKeyword,
  joinKeyword,
  disjoinKeyword,
  deleteKeyword,
  mergeKeyword,
};
