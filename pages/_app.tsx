import Head from 'next/head'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Nav Home</title>
      </Head>
      <main className="font-main">
        <Component {...pageProps} />
      </main>
      <SpeedInsights />
    </>
  )
}
