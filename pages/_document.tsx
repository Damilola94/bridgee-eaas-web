import Document, {
  Html, Head, Main, NextScript
} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.svg" />
          <meta name="description" content="Plan your Finances, all in one place" />
          <link href="https://fonts.googleapis.com/css2?family=Inter&display=optional" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
