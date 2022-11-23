import styles from '@sass/components/community/KeywordBubbleChart.module.scss';
import classnames from 'classnames/bind';
import { KeywordData } from '../../types/types';
const cx = classnames.bind(styles);

interface KeywordBubbleChart {
  communityKeywordData: KeywordData[];
}

const KeywordBubbleChart = ({ communityKeywordData }: KeywordBubbleChart) => {
  return <div className={cx('chart-container')}>1</div>;
};

export default KeywordBubbleChart;
