import Main from "../components/basic/layouts/Main";
import Banner from "../components/basic/Banner";
import React, { useState } from "react";
import { prisma } from "../server/db";
import Meta from "../components/basic/layouts/Meta";
import { Category } from "../model/Category.model";
import Card from "../components/basic/product/Card";


export interface RootObject {
  categories: Category[];
}

export const getServerSideProps = async () => {
  const categories = JSON.parse(
    JSON.stringify(
      await prisma.category.findMany({
        include: {
          products: true,
        },
      })
    )
  );

  return { props: { categories } };
};

const Home: React.FC<RootObject> = (categories) => {
  
  return (
    <>
      <Meta
        title="CloudVPS - Cho thuê vps chất lượng cao"
        description="CloudVPS - Cho thuê vps chất lượng cao"
      />
      <Main>
        <Banner />
        <div className="content mt-10 flex flex-col gap-y-2">
          {categories.categories.map((category) => {
            return (
              <div className="" key={category.id}>
                <div className="collapse-title rounded-t-lg bg-primary text-xl font-bold text-primary-content">
                  {category.name} -{" "}
                  <span className="italic text-red-700">
                    Sản Phẩm: {category.products.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-y-4 rounded-b-lg bg-base-200 p-4">
                  {category.products.length > 0 &&
                    category.products.map((product) => {
                      return (
                        <Card key={product.id} product={product} />
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </Main>
    </>
  );
};

export default Home;
