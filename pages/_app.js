import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import store from '../store/Store'
import '../styles/globals.css'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
