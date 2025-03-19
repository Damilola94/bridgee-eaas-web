/* eslint-disable @next/next/no-sync-scripts */
import Document, {
  Html, Head, Main, NextScript
} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.svg" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <meta name="description" content="Shield yourself from online scams, protect your transactions with UseBridge Inc." />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;900&display=swap" rel="stylesheet" />
        </Head>

        <body>
          <Main />
          <NextScript />
          <script src="../Daon.FaceCapture.min.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
