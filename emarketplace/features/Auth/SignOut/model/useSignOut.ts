import { useCallback } from 'react';
import { signOut } from 'next-auth/react';

import { useStorageService } from 'shared/libs';
import { orderModel } from 'entities/order';

export const useSignOut = (): (() => Promise<undefined>) => {
  const storageService = useStorageService();
  return useCallback(() => {
    storageService.removeItem('persist:root');
    orderModel.clearOrder();
    return signOut({ callbackUrl: '/login' });
  }, []);
};
