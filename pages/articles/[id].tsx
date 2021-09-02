import Layout from "../../components/layouts/homeLayout";
import Head from "next/head";
import Date from "../../components/date/date";
import { getArticleById, getArticlePaths } from "../../lib/articles";

export async function getStaticPaths() {
  const paths = await getArticlePaths();
  console.log(paths);
  return {
    paths: paths.map((path) => ({ params: { id: path } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      article: await getArticleById(params.id),
    },
  };
}

export default function Post({ article }) {
  return (
    <Layout>
      <Head>
        <title>{article.title}</title>
      </Head>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <header>
            <h1 className="mt-16 mb-4 md:mb-6 text-4xl md:text-5xl lg:text-6xl font-heading text-center md:text-left leading-8 font-normal text-gray-900">
              {article.title}
            </h1>
            <hr className="hidden md:block" />
            <div className="md:flex flex-row flex-wrap justify-between mt-2 mb-8 md:mb-12 text-gray-500 font-light">
              <div className="text-center md:text-left">
                <Date dateString={article.date} />
              </div>
            </div>
          </header>
          <article className="mt-6 prose prose-xl mx-auto text-gray-800 break-words leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
          </article>
        </div>
      </div>
    </Layout>
  );
}
