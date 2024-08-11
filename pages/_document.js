import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700&display=swap"
        />
        <link rel="preload" href="/Hero Photo 1.jpg" as="image" />
        <link rel="preload" href="/Hero Photo 2.jpg" as="image" />
        <link rel="preload" href="/Hero Photo 3.jpg" as="image" />
        <link rel="preload" href="/Hero Photo 4.jpg" as="image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
