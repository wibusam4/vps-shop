import React from "react";
import FormCard from "../../components/basic/card/Form";
import Warning from "../../components/basic/card/Warning";
import Main from "../../components/basic/layouts/Main";
import Meta from "../../components/basic/layouts/Meta";

interface CardProps {}

const Card: React.FC<CardProps> = () => {
  return (
    <>
      <Meta title="" description="" />
      <Main>
        <div className="collapse-title rounded-t-lg bg-primary text-xl font-bold text-primary-content">
          Nạp Card
        </div>
        <div className="flex flex-wrap w-full gap-y-4 rounded-b-lg bg-base-200 p-4">
          <FormCard/>
          <Warning/>
        </div>
      </Main>
    </>
  );
};

export default Card;
