import React, {
  createContext,
  useContext,
  ReactElement,
  useLayoutEffect,
  useState,
  ComponentType,
} from 'react';
import { BasicStorageService, StorageService } from './storageService';

const StorageServiceContext = createContext<BasicStorageService | null>(null);

export const useStorageService = (): BasicStorageService => {
  const storageService = useContext(StorageServiceContext);

  return storageService;
};

interface Props {
  children?: ReactElement;
}

export function StorageServiceProvider({ children }: Props): ReactElement {
  const [storageService, setStorageService] = useState<BasicStorageService>(null);

  useLayoutEffect(() => {
    setStorageService(new StorageService(localStorage));
  }, []);

  return (
    <StorageServiceContext.Provider value={storageService}>
      {children}
    </StorageServiceContext.Provider>
  );
}

export function withStorageService(Component: ComponentType<any>): ComponentType<any> {
  return (props): ReactElement => {
    return (
      <StorageServiceProvider>
        <Component {...props} />
      </StorageServiceProvider>
    );
  };
}
