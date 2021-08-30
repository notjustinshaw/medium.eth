import Layout from "../../components/layouts/homeLayout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date/date";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <header>
            <h1 className="mt-16 mb-4 md:mb-6 text-4xl md:text-5xl lg:text-6xl font-heading text-center md:text-left leading-8 font-normal text-gray-900">
              {postData.title}
            </h1>
            <hr className="hidden md:block" />
            <div className="md:flex flex-row flex-wrap justify-between mt-2 mb-8 md:mb-12 text-gray-500 font-light">
              <div className="text-center md:text-left">
                <Date dateString={postData.date} />
              </div>
            </div>
          </header>
          <article className="mt-6 prose prose-xl text-gray-900 mx-auto font-body break-words">
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          </article>
        </div>
      </div>
    </Layout>
  );
}
