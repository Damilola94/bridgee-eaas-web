/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/next-script-for-ga */
import Document, {
  Html, Head, Main, NextScript
} from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.svg" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <meta
            name="description"
            content="Shield yourself from online scams, protect your transactions with UseBridgee Inc."
          />
          <meta
            name="google-site-verification"
            content="D1t8IAeRdekuhqo7m96jmyKraj7WOBfLAMOqYIRXbRo"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;900&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <Main />
          <NextScript />

          <script src="../Daon.FaceCapture.min.js"></script>

          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-Q27PGW7EQZ"
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
                gtag('config', 'G-Q27PGW7EQZ', {
                  page_path: window.location.pathname,
                });
              `
            }}
          />

          <Script
            id="twitter-base"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(e,t,n,s,u,a){
                  e.twq||(s=e.twq=function(){
                    s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
                  },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
                  a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))
                }(window,document,'script');
                twq('config','pfu9z');
              `
            }}
          />

          <Script
            id="twitter-event"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                twq('event', 'tw-pfu9z-pfua1', {
                  email_address: null,
                  phone_number: null
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
