import classnames from 'classnames/bind';
import styles from '@sass/components/community/SearchResultListLayout.module.scss';
const cx = classnames.bind(styles);

interface SearchResultListLayoutProps {
  children: React.ReactNode;
  theme: string;
}

const SearchResultListLayout = ({
  children,
  theme,
}: SearchResultListLayoutProps) => {
  return <ul className={cx(`${theme}`)}>{children}</ul>;
};

export default SearchResultListLayout;
