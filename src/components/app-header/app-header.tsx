import { FC } from 'react';
import { useAppSelector } from '../../services/store';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const userName = useAppSelector((state) => state.user.user?.name) || '';
  return <AppHeaderUI userName={userName} />;
};
