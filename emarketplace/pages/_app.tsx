import { ReactElement } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import theme from 'app/theming/theme';
import createEmotionCache from 'app/theming/createEmotionCache';
import { HttpServiceProvider, withStorageService } from 'shared/libs';
import { store } from 'app/store';

const persistor = persistStore(store);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function App(props: MyAppProps): ReactElement {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <HttpServiceProvider>
      <Provider store={store}>
        <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </CacheProvider>
        </PersistGate>
      </Provider>
    </HttpServiceProvider>
  );
}

export default withStorageService(App);
