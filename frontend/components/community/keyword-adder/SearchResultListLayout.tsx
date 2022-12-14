import classnames from 'classnames/bind';
import styles from '@sass/components/community/keyword-adder/SearchResultListLayout.module.scss';
const cx = classnames.bind(styles);

interface SearchResultListLayoutProps {
  children: React.ReactNode;
  layoutTheme: string;
}

// 세부적인 설정보다는 layout의 className으로 쓸 theme만 받아서 scss로 스타일링한다.
const SearchResultListLayout = ({
  children,
  layoutTheme,
}: SearchResultListLayoutProps) => {
  return <ul className={cx(layoutTheme)}>{children}</ul>;
};

export default SearchResultListLayout;
