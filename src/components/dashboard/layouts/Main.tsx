import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const Main: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="drawer-mobile drawer">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Header></Header>
        {children}
      </div>
      <Sidebar></Sidebar>
    </div>
  );
};

export default Main;
