import React from "react";
import "../styles/global.scss";
import GoogleFonts from "next-google-fonts";
import NavbarCustom from "../components/NavbarCustom";
import Footer from "../components/Footer";
import "../util/analytics";
import { ProvideAuth } from "../util/auth";
import { AppProps } from "next/app";
import Head from "next/head";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
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
      <NavbarCustom bg="white" variant="light" expand="md" logo="https://uploads.divjoy.com/logo.svg" />
      <Component {...pageProps} />

      <Footer
        bg="light"
        textColor="dark"
        size="sm"
        bgImage=""
        bgImageOpacity={1}
        description="A short description of what you do here"
        copyright="© 2020 Company"
        logo="https://uploads.divjoy.com/logo.svg"
      />
    </ProvideAuth>
  );
};

export default MyApp;
