import { Suggestion, SaveImageHandler } from "react-mde";
import * as Showdown from "showdown";

export const loadSuggestions = async (text: string) => {
  return new Promise<Suggestion[]>((resolve, reject) => {
    setTimeout(() => {
      const suggestions: Suggestion[] = [
        {
          preview: "Justin",
          value: "@justin",
        },
        {
          preview: "Soren",
          value: "@Soren",
        },
      ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()));
      resolve(suggestions);
    }, 250);
  });
};

export const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export const save: SaveImageHandler = async function* (data: ArrayBuffer) {
  // Promise that waits for "time" milliseconds
  const wait = function (time: number) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => resolve(0), time);
    });
  };

  // Upload "data" to your server
  // Use XMLHttpRequest.send to send a FormData object containing
  // "data"
  // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

  await wait(2000);
  // yields the URL that should be inserted in the markdown
  yield "https://picsum.photos/300";
  await wait(2000);

  // returns true meaning that the save was successful
  return true;
};

// make a POST request to /api/articles to upload the article and then redirect to the article.
export async function publishArticle(title: string, article: string) {
  const response = await fetch("/api/articles", {
    method: "POST",
    body: JSON.stringify({
      title,
      article,
    }),
  });
  const { data, error } = await response.json();
  if (data?.articleId) {
    window.location.href = "/articles/" + data.articleId;
  } else {
    console.log("Error: ", error);
  }
}
