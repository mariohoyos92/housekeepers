import React from 'react';
import '../styles/global.scss';
import GoogleFonts from 'next-google-fonts';
import NavbarCustom from '../components/NavbarCustom';
import Footer from '../components/Footer';
import '../util/analytics';
import { ProvideAuth } from '../util/auth';
import { AppProps } from 'next/app';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ProvideAuth>
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
