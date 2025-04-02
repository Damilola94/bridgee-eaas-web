/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/next-script-for-ga */
import Document, {
  Html, Head, Main, NextScript
} from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
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

          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-Y9V7VND8SR"
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-Y9V7VND8SR', {
                  page_path: window.location.pathname,
                });
              `
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
