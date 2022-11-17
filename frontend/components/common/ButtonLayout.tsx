import classnames from 'classnames/bind';
import styles from '@sass/components/common/ButtonLayout.module.scss';
const cx = classnames.bind(styles);

interface ButtonLayoutProps {
  children: React.ReactNode;
  width: number;
  height: number;
  fontSize: number;
}

const ButtonLayout = ({
  children,
  width,
  height,
  fontSize,
}: ButtonLayoutProps) => {
  return (
    <button className={cx('default')} style={{ width, height, fontSize }}>
      {children}
    </button>
  );
};

export default ButtonLayout;
