import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <div className="min-h-[66px]"></div>
      <main className="bg-gradient-to-b from-base-content to-base-300">
        <div className="container m-auto min-h-screen max-w-[1200px] px-4 py-16 ">
          {children}
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Main;
