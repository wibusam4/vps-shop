import Main from "../components/basic/layouts/Main";
import Banner from "../components/basic/Banner";
import React, { useState } from "react";
import { prisma } from "../server/db";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatPrices } from "../until";
import Meta from "../components/basic/layouts/Meta";
export interface Product {
  id: number;
  categoryId: number;
  name: string;
  price: number;
  cpu: number;
  ram: number;
  os: string;
  bandwidth: string;
  status: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
}

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
                        <div
                          key={product.id}
                          className="w-full p-2 md:w-[50%] lg:w-[25%]"
                        >
                          <div className="card card-compact border border-black bg-base-100 shadow-xl">
                            <figure className="aspect-[1/1] w-full">
                              <LazyLoadImage
                                effect="blur"
                                src="https://placeimg.com/300/200/arch"
                                className="aspect-[1/1] w-full object-cover"
                              />
                            </figure>
                            <div className="card-body font-bold">
                              <h2 className="card-title justify-center uppercase">
                                {product.name}
                              </h2>
                              <p className="text-center text-sm text-error">
                                {formatPrices(product.price)} / Tháng
                              </p>
                              <p className="text-center text-sm">
                                {product.cpu} CORE
                              </p>
                              <p className="text-center text-sm">
                                {product.ram}GB RAM
                              </p>
                              <p className="text-center text-sm">
                                Băng thông: {product.bandwidth}
                              </p>
                              <p className="text-center text-sm">
                                OS: {product.os}
                              </p>
                              <p
                                className={`text-center text-sm ${
                                  product.status === "ACTIVE"
                                    ? ""
                                    : "text-error"
                                }`}
                              >
                                Trạng thái:{" "}
                                {product.status === "ACTIVE"
                                  ? "Còn hàng"
                                  : "Hết Hàng"}
                              </p>
                              <div className="card-actions justify-end">
                                <button className="btn-primary btn w-full">
                                  Buy Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
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
