import "../styles/tailwind.css";
import { DAppProvider } from "@usedapp/core";

export default function App({ Component, pageProps }) {
  return (
    <DAppProvider config={{}}>
      <Component {...pageProps} />
    </DAppProvider>
  );
}
