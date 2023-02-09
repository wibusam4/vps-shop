import { type AppType } from "next/app";
import { type Session } from "next-auth";
import * as React from "react";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "react-lazy-load-image-component/src/effects/blur.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ToastContainer />
      <NextNProgress color="#1fe330" />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
