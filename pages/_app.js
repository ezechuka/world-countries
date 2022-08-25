import { ChakraProvider } from "@chakra-ui/react"
import NProgress from "nprogress"
import Router from "next/router"
import "@fontsource/nunito-sans/300.css"
import "@fontsource/nunito-sans/600.css"
import "@fontsource/nunito-sans/800.css"

import Layout from "../components/Layout"
import theme from "../theme/styles"
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  NProgress.configure({ showSpinner: true })

  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })

  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })

  return (

    <>
      <Head>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css' integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==' crossOrigin='anonymous' referrerPolicy='no-referrer' />
      </Head>

      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  )
}

export default MyApp