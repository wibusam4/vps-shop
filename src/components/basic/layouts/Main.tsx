import React from "react";
import Header from "./Header";

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <div className="min-h-[66px]"></div>
      <div className="bg-base-200">{children}</div>
    </div>
  );
};

export default Main;
