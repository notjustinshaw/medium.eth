import Head from "next/head";
import React from "react";
import Editor from "react-mde";
import remark from "remark";
import html from "remark-html";
import Layout from "../components/layouts/homeLayout";
import LoadingAnimation from "../components/loading";
import { save, publishArticle } from "../lib/editor";

type mode = "write" | "preview";

export default function NewArticle() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("Write your article...");
  const [selectedTab, setSelectedTab] = React.useState<mode>("write");

  return (
    <Layout home>
      <Head>
        <title>New Article | Nonce</title>
      </Head>
      <div className="max-w-6xl max-h-full mx-auto my-4 md:my-12 p-4">
        <h1 className="text-3xl font-heading mb-8 md:mb-4 text-center sm:text-left">
          New Article
        </h1>
        <div>
          <label htmlFor="article_title" className="sr-only">
            Title
          </label>
          <input
            type="text"
            name="article_title"
            id="article_title"
            onChange={(e) => setTitle(e.target.value)}
            className="focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-lg mb-4"
            placeholder="Title"
            value={title}
          />
        </div>
        <Editor
          value={body}
          onChange={setBody}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={async (markdown) => {
            const processedContent = await remark().use(html).process(markdown);
            const contentHtml = processedContent.toString();
            return Promise.resolve(contentHtml);
          }}
          childProps={{
            writeButton: {
              tabIndex: -1,
            },
          }}
          paste={{ saveImage: save }}
        />
        <div
          onClick={async () => {
            setIsLoading(true);
            await publishArticle(title, body);
            setIsLoading(false);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-transparent mt-4 cursor-pointer"
        >
          {isLoading && <LoadingAnimation />}
          Publish
        </div>
      </div>
    </Layout>
  );
}
