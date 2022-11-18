import React from 'react';
import { AxiosContext } from './httpServiceContext';
import { axiosInstance } from './initializeAxios';

interface Props {
  children?: React.ReactElement;
}

export function HttpServiceProvider(props: Props): JSX.Element {
  return (
    <AxiosContext.Provider value={axiosInstance}>{props.children}</AxiosContext.Provider>
  );
}
