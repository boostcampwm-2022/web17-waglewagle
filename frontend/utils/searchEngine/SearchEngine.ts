interface WordProps {
  keyword: string;
}

abstract class SearchEngine {
  public abstract insert(word: WordProps): void;

  public abstract search(searchKeyword: string): string[];
}

export default SearchEngine;
