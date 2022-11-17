import classnames from 'classnames/bind';
import styles from '@sass/components/common/DefaultButton.module.scss';
const cx = classnames.bind(styles);

interface DefaultButtonProps {
  children: React.ReactNode;
  width: number;
  height: number;
  fontSize: number;
}

const DefaultButton = ({
  children,
  width,
  height,
  fontSize,
}: DefaultButtonProps) => {
  return (
    <button className={cx('default')} style={{ width, height, fontSize }}>
      {children}
    </button>
  );
};

export default DefaultButton;
