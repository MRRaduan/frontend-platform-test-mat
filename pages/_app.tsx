// These styles apply to every route in the application
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>MUSE.ai</title>
        <link rel="shortcut icon" href="favicon.png" />
        <link rel="apple-touch-icon" href="favicon.png" />
        <meta name="theme-color" content="#1D1D1D"></meta>
        <meta
          name="description"
          content="Discover your next favorite song with MUSE.ai, the ultimate music streaming app. Enjoy personalized playlists, high-quality audio, and an intuitive interface tailored to your musical tastes. Explore millions of tracks and let MUSE.ai be your guide to a world of music."
        />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
