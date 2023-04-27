import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Script src="https://stg.static.mul-pay.jp/ext/js/token.js" /> */}

      <Component {...pageProps} />
    </>
  );
}
