import Head from "next/head";
import Layout from "../components/layouts/homeLayout";
import Link from "next/link";
import { v4 as uuid } from "uuid";
import Date from "../components/date/date";
import { getFrontPageArticles } from "../lib/articles";

export async function getStaticProps() {
  const articles = await getFrontPageArticles();
  return {
    props: {
      articles,
    },
    revalidate: 1,
  };
}

export default function Home({ articles }) {
  return (
    <Layout home>
      <Head>
        <title>Nonce</title>
      </Head>
      <div className="max-w-prose mx-auto">
        <section className="mx-4 mb-12">
          <h2 className="mb-4 text-2xl mt-8 md:mt-12 leading-6 font-heading text-gray-900">
            For You
          </h2>
          <div className="bg-white border border-gray-300 overflow-hidden rounded-md">
            <ul role="list" className="divide-y divide-gray-300">
              {articles.map(({ id, date, title }) => (
                <Link href={`/articles/${id}`} key={uuid()}>
                  <li
                    key={id}
                    className="px-6 py-4 cursor-pointer hover:bg-gray-50"
                  >
                    <a>{title}</a>
                    <br />
                    <small className="text-gray-500 font-light">
                      <Date dateString={date} />
                    </small>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  );
}
