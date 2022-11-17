import classnames from 'classnames/bind';
import styles from '@sass/components/home/HomeDescriptionLayout.module.scss';
const cx = classnames.bind(styles);

interface HomeMainLayoutProps {
  children: React.ReactNode;
}

const HomeDescriptionLayout = ({ children }: HomeMainLayoutProps) => {
  return (
    <section id='description' className={cx('description')}>
      {children}
    </section>
  );
};

export default HomeDescriptionLayout;
