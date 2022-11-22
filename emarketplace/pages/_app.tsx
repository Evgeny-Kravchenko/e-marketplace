import { ReactElement } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { SessionProvider } from 'next-auth/react';
import { NextComponentType } from 'next';

import { createEmotionCache, theme } from 'shared/theming';
import { HttpServiceProvider, withStorageService } from 'shared/libs';
import { store } from 'app/store';
import { withAuth } from 'shared/hocs';

const persistor = persistStore(store);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  Component: NextComponentType & { auth?: boolean }; // add auth type
  emotionCache?: EmotionCache;
}

function App(props: MyAppProps): ReactElement {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;

  const CurrentComponent = Component.auth ? withAuth(Component) : Component;

  return (
    <SessionProvider session={session}>
      <HttpServiceProvider>
        <Provider store={store}>
          <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
            <CacheProvider value={emotionCache}>
              <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <CurrentComponent {...pageProps} />
              </ThemeProvider>
            </CacheProvider>
          </PersistGate>
        </Provider>
      </HttpServiceProvider>
    </SessionProvider>
  );
}

export default withStorageService(App);
