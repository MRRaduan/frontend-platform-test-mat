import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/Header";
import Providers from "./providers";

export const metadata = {
  title: "MUSE.ai",
  description:
    "Discover your next favorite song with MUSE.ai, the ultimate music streaming app. Enjoy personalized playlists, high-quality audio, and an intuitive interface tailored to your musical tastes. Explore millions of tracks and let MUSE.ai be your guide to a world of music.",
  "theme-color": "#1d1d1d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="pb-20">
        <Head>
          <title>MUSE.ai</title>
          <link rel="shortcut icon" href="favicon.png" />
          <link rel="apple-touch-icon" href="favicon.png" />
        </Head>
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
