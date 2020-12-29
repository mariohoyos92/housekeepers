import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/global.css";
import GoogleFonts from "next-google-fonts";
import "../util/analytics";
import { ProvideAuth } from "../util/auth";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { useRouter } from "next/router";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const Router = useRouter();
  return (
    <ProvideAuth>
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="d7f67991-52c5-4a65-b717-20fc27029880";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
          }}
        />
      </Head>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" />
      {!Router.asPath.includes("auth") && <Nav />}
      <Component {...pageProps} />
      {!Router.asPath.includes("auth") && <Footer />}
    </ProvideAuth>
  );
};

export default MyApp;
