import Head from "next/head";
import Navbar from "../navbar";

export default function Layout({ children, home = false }) {
  return (
    <>
      <Head>
        {/* Favicon and Fonts */}
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;500;700&display=swap"
          rel="stylesheet"
        />

        {/* OG Tags */}
        <meta name="og:title" content="Nonce" />
        <meta property="og:description" content="A new medium for web3." />
        <meta property="og:image" content="/assets/images/logo_512.png" />

        {/* Twitter Tags */}
        <meta name="twitter:title" content="Nonce" />
        <meta name="twitter:description" content="A new medium for web3." />
        <meta name="twitter:card" content="/assets/images/logo_512.png" />
        <meta name="twitter:image" content="/assets/images/logo_128.png" />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
