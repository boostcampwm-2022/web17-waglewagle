import SearchEngine from './SearchEngine';

interface TrieNodeInterface {
  isCompleteWord: boolean; // TODO : isLastChar는 어떨까?
  children: Record<string, TrieNodeInterface>;
}

interface WordProps {
  keyword: string;
  count: number;
}

class TrieNode implements TrieNodeInterface {
  isCompleteWord: boolean;
  children: Record<string, TrieNodeInterface>;

  constructor() {
    this.isCompleteWord = false;
    this.children = {};
  }
}

type Stack = [TrieNode, string][];

class TrieSearchEngine extends SearchEngine {
  headNode: TrieNode; // 인터페이스가 아닌 구현체가 들어가므로

  constructor() {
    super();
    this.headNode = new TrieNode();
  }

  insert(word: WordProps) {
    let currNode = this.headNode;
    for (const char of word.keyword) {
      // TODO : 아래랑 ealry return 맞춰보기
      if (char in currNode.children) {
        // 있으면 그 노드로 이동함
        currNode = currNode.children[char];
      } else {
        // 없으면 새 노드 추가함.
        const newNode = new TrieNode();
        currNode.children[char] = newNode;
        currNode = newNode;
      }
    }
    currNode.isCompleteWord = true;
  }

  getSearchKeywordNode(searchKeyword: string) {
    let currNode = this.headNode;
    for (const char of searchKeyword) {
      if (!(char in currNode.children)) {
        // 현재 단어 없으면 빈 배열 반환
        return false;
      }
      // 있으면 다음 문자로 이동
      currNode = currNode.children[char];
    }

    return currNode;
  }

  dfsNodeSearch(searchKeywordNode: TrieNode) {
    let isSearchStack = true;
    const result = [];
    const stack: Stack = [[searchKeywordNode, '']];

    while (isSearchStack) {
      const currSearchStack = stack.pop();
      if (!currSearchStack) {
        isSearchStack = false;
        return result;
      }
      const [currNode, restStr] = currSearchStack;
      if (currNode.isCompleteWord) {
        // 커뮤니티에 단어가 있으면 현재 문자를 추가한다!
        result.push(restStr);
      }
      for (const key of Object.keys(currNode.children)) {
        stack.push([currNode.children[key], restStr + key]);
      }
    }
  }

  search(searchKeyword: string) {
    const searchKeywordNode = this.getSearchKeywordNode(searchKeyword);
    if (!searchKeywordNode) {
      return [];
    }
    // 찾아낸 문자열을 검색 target 문자열에 합쳐서 결과를 만든다.
    const restStrArray = this.dfsNodeSearch(searchKeywordNode);
    if (!restStrArray) {
      return [];
    }

    const searchResult = restStrArray.map((restStr) => searchKeyword + restStr);

    return searchResult;
  }
}

export default TrieSearchEngine;

// 더미 데이터
const wordList = [
  { keyword: '가', count: 3 },
  { keyword: '다', count: 3 },
  { keyword: '나', count: 3 },
  { keyword: '가나', count: 3 },
  { keyword: '가다', count: 3 },
  { keyword: '가나다', count: 2 },
  { keyword: '가나라', count: 3 },
  { keyword: '가나라마', count: 3 },
];

// 트라이 자료구조를 만든다.
const searchEngine = new TrieSearchEngine();

// 트라이 자료구조에 단어를 추가한다.
wordList.forEach((word) => {
  searchEngine.insert(word);
});
