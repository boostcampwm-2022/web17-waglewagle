import { listeningEvent } from './event.enum';

interface listeningEventInput {
  [listeningEvent.select_keyword]: { keyword: string; communityId: string };
  [listeningEvent.deselect_keyword]: { keywordId: string; communityId: string };
  [listeningEvent.delete_keyword]: { keywordId: string; communityId: string };
  [listeningEvent.create_thread]: { keywordId: string; parentThreadId?: string; content: string };
  [listeningEvent.delete_thread]: { threadId: string };
}

type selectKeywordInput = listeningEventInput[listeningEvent.select_keyword];
type deselectKeywordInput = listeningEventInput[listeningEvent.deselect_keyword];
type deleteKeywordInput = listeningEventInput[listeningEvent.delete_keyword];
type createThreadInput = listeningEventInput[listeningEvent.create_thread];
type deleteThreadInput = listeningEventInput[listeningEvent.delete_thread];

export {
  selectKeywordInput,
  deselectKeywordInput,
  deleteKeywordInput,
  createThreadInput,
  deleteThreadInput,
};
