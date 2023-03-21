import { Helmet } from "react-helmet-async";

function MetaTag({subject, desc}) {
    return (
      <Helmet>
        <title>{subject}</title>
        <meta name="title" content={subject} />
        <meta name="description" content={desc} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={subject} />
        <meta property="og:description" content={desc} />
        {/* <meta property="og:url" content="https://metatags.io/" /> */}
        {/* <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" /> */}

        <meta property="twitter:title" content={subject} />
        <meta property="twitter:description" content={desc} />
        {/* <meta property="twitter:card" content="summary_large_image" /> */}
        {/* <meta property="twitter:url" content="https://metatags.io/" /> */}
        {/* <meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" /> */}
      </Helmet>
    );
}

export default MetaTag;