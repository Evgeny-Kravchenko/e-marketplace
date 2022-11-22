import { useRouter } from 'next/router';
import React, { ReactElement, ComponentType } from 'react';
import { useSession } from 'next-auth/react';

export const withAuth = function <T>(Component: ComponentType<T>): ComponentType<T> {
  return (props: T): ReactElement => {
    const router = useRouter();
    const { status } = useSession({
      required: true,
      onUnauthenticated() {
        router.push('/unauthorized?message=login required');
      },
    });

    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
};
