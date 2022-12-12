import { MouseEventHandler } from 'react';

interface SearchResultListProps {
  searchResult: string[];
  handleMouseDownResultItem: MouseEventHandler<HTMLLIElement>;
}

const SearchResultList = ({
  searchResult,
  handleMouseDownResultItem,
}: SearchResultListProps) => {
  return (
    <>
      {searchResult.map((word, index) => (
        <li onMouseDown={handleMouseDownResultItem} key={index}>
          {word}
        </li>
      ))}
    </>
  );
};

export default SearchResultList;
