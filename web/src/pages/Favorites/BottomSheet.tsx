import styles from './BottomSheet.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface BottomSheetProps {
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ children }) => {
  return (
    <div className={cx('bottom-sheet-container')}>
      <div className={cx('bottom-sheet')}>
        {children}
      </div>
    </div>
  );
};
