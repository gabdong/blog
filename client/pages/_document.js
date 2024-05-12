import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    //* styled-components ssr
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta
            name="google-site-verification"
            content="OPfSIjuzB6P7RnrF88PqkLUV_ZNtzS-9EdiYdit7uGQ"
          />
          <meta
            name="naver-site-verification"
            content="aa987b92c2771199b2c5421496010d8055a4cc4a"
          />
        </Head>
        <body className="scroll">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
