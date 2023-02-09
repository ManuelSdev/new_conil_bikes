import * as React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import theme from '../src/theme'
import createEmotionCache from '../src/lib/createEmotionCache'
import { wrapper } from '@/src/store'
import { Provider } from 'react-redux'
import '../styles/globals.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp({ Component, ...rest }) {
   // const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
   const { store, props } = wrapper.useWrappedStore(rest)
   const { pageProps, emotionCache = clientSideEmotionCache } = props
   return (
      <CacheProvider value={emotionCache}>
         <Head>
            <meta
               name="viewport"
               content="initial-scale=1, width=device-width"
            />
         </Head>

         <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Provider store={store}>
               <Component {...pageProps} />
            </Provider>
         </ThemeProvider>
      </CacheProvider>
   )
}

export default MyApp

MyApp.propTypes = {
   Component: PropTypes.elementType.isRequired,
   emotionCache: PropTypes.object,
   pageProps: PropTypes.object.isRequired,
}
