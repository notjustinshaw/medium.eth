import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const name = "Justin Shaw";
export const siteTitle = "Justin Shaw";

export default function Layout({ children, home = false }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="An asynchronous stream of thoughts from Justin's brain to yours."
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@600&family=Lora&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header>
        {home && (
          <div className="my-12 max-w-prose mx-auto">
            <div className="flex-row flex justify-center">
              <Image
                priority
                src="/images/profile.jpeg"
                className="rounded-full"
                height={144}
                width={144}
                alt={name}
              />
            </div>
            <h1 className="mb-4 text-center text-5xl font-heading">{name}</h1>
            <p className="text-center text-gray-500 font-light">21 • CS TA @ UW • he/him</p>
          </div>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
}
