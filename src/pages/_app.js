import Layout from '../components/Layout/Layout'
import {AppState} from '../context/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AppState>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppState>
  )
}

export default MyApp
