import Head from 'next/head'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Nav Home</title>
        <meta name="description" content="A simple bookmark page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-mono">
        <Component {...pageProps} />
      </main>
    </>
  )
}
