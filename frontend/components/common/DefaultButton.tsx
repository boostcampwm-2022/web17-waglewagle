import classnames from 'classnames/bind';
import styles from '@sass/components/common/DefaultButton.module.scss';
const cx = classnames.bind(styles);

interface DefaultButtonProps {
  children: React.ReactNode;
  width: number;
  height: number;
  fontSize: number;
  handleClick?: () => void;
}

const DefaultButton = ({
  children,
  width,
  height,
  fontSize,
  handleClick,
}: DefaultButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className={cx('default')}
      style={{ width, height, fontSize }}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
