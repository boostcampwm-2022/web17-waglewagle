import { FormEventHandler } from 'react';
import styles from '@sass/components/community/keyword-adder/AutoCompleteFormLayout.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

interface AutoCompleteFormLayoutProps {
  children: React.ReactNode;
  layoutTheme: string;
  handleSubmit: FormEventHandler<HTMLFormElement>;
}

const AutoCompleteFormLayout = ({
  children,
  layoutTheme,
  handleSubmit,
}: AutoCompleteFormLayoutProps) => {
  return (
    <form onSubmit={handleSubmit} className={cx(layoutTheme)}>
      {children}
    </form>
  );
};

export default AutoCompleteFormLayout;
