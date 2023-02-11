import React from "react";
import Warning from "../../components/basic/wallet/Warning";
import Main from "../../components/basic/layouts/Main";
import Meta from "../../components/basic/layouts/Meta";
import Infor from "../../components/basic/wallet/Infor";

interface MomoProps {}

const Momo: React.FC<MomoProps> = () => {
  return (
    <>
      <Meta title="" description="" />
      <Main>
        <div className="collapse-title rounded-t-lg bg-primary text-xl font-bold text-primary-content">
          Nạp Momo
        </div>
        <div className="flex flex-col sm:flex-row w-full gap-4 rounded-b-lg bg-base-200 p-4">
          <Infor wallet="0367258861" name="Văn Cường" image="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" />
          <Warning />
        </div>
      </Main>
    </>
  );
};

export default Momo;
