import classnames from 'classnames/bind';
import styles from '@sass/components/community/MyKeywordHighlight.module.scss';
const cx = classnames.bind(styles);

interface MyKeywordHighlightProps {
  toggleIsMyKeywordHighlight: () => void;
}

const MyKeywordHighlight = ({
  toggleIsMyKeywordHighlight,
}: MyKeywordHighlightProps) => {
  return (
    <div className={cx('container')}>
      <input
        onChange={toggleIsMyKeywordHighlight}
        id='my-keyword-highlight'
        type='checkbox'
      />
      <label htmlFor='my-keyword-highlight'>내 키워드 강조하기</label>
    </div>
  );
};

export default MyKeywordHighlight;
