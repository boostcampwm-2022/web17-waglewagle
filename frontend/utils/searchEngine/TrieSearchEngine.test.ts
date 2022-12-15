import TrieSearchEngine from './TrieSearchEngine';

describe('TrieSearchEngine', () => {
  let trieSearchEngine: TrieSearchEngine;

  beforeEach(() => {
    trieSearchEngine = new TrieSearchEngine();
  });

  it('Search all word', () => {
    trieSearchEngine.insert({ keyword: '가' });
    trieSearchEngine.insert({ keyword: '나' });
    expect(trieSearchEngine.search('')).toEqual(
      expect.arrayContaining(['가', '나']),
    );
  });

  it('No insert', () => {
    expect(trieSearchEngine.search('')).toEqual(expect.arrayContaining([]));
  });

  it('Insert blank', () => {
    trieSearchEngine.insert({ keyword: ' ' });
    trieSearchEngine.insert({ keyword: '가' });
    expect(trieSearchEngine.search('')).toEqual(expect.arrayContaining(['가']));
  });

  it('Search char', () => {
    trieSearchEngine.insert({ keyword: '가' });
    trieSearchEngine.insert({ keyword: '가나' });
    trieSearchEngine.insert({ keyword: '나' });
    expect(trieSearchEngine.search('가')).toEqual(
      expect.arrayContaining(['가', '가나']),
    );
  });
});
