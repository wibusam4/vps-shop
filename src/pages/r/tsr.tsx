import React from "react";
import Warning from "../../components/basic/wallet/Warning";
import Main from "../../components/basic/layouts/Main";
import Meta from "../../components/basic/layouts/Meta";
import Infor from "../../components/basic/wallet/Infor";

interface TsrProps {}

const Tsr: React.FC<TsrProps> = () => {
  return (
    <>
      <Meta title="" description="" />
      <Main>
        <div className="collapse-title rounded-t-lg bg-primary text-xl font-bold text-primary-content">
          Nạp Thẻ Siêu Rẻ
        </div>
        <div className="flex flex-col sm:flex-row w-full gap-4 rounded-b-lg bg-base-200 p-4">
          <Infor wallet="wibusama" name="Văn Cường" image="https://thesieure.com/storage/userfiles/images/logo_thesieurecom.png" />
          <Warning />
        </div>
      </Main>
    </>
  );
};

export default Tsr;
