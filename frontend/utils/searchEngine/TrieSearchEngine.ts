import SearchEngine from './SearchEngine';

interface TrieNodeInterface {
  isCompleteWord: boolean; // TODO : isLastChar는 어떨까?
  children: Record<string, TrieNodeInterface>;
}

interface WordProps {
  keyword: string;
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
    if (!word.keyword.trim()) {
      return;
    }
    let currNode = this.headNode;
    for (const char of word.keyword) {
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

    const restStrArray = this.dfsNodeSearch(searchKeywordNode);
    if (!restStrArray) {
      return [];
    }

    return restStrArray.map((restStr) => searchKeyword + restStr);
  }
}

export default TrieSearchEngine;
