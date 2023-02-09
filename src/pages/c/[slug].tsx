import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Main from "../../components/basic/layouts/Main";
import Meta from "../../components/basic/layouts/Meta";
import { prisma } from "../../server/db";
import { formatPrices, getColorStatus, getStatus } from "../../until";

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
  category: Category;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = `c/${params?.slug as string}`;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const category = JSON.parse(
    JSON.stringify(
      await prisma.category.findFirst({
        where: { slug },
        include: { products: true },
      })
    )
  );
  return {
    props: {
      category,
    },
    revalidate: 60,
  };
};

const SlugCategory: React.FC<RootObject> = (category) => {

  return (
    <>
      <Meta
        title={`CloudVPS -`}
        description="CloudVPS - Cho thuê vps chất lượng cao"
      />
      <Main>
        <h1 className="text-center text-4xl font-bold uppercase text-primary">
          Bảng giá {category.category.name}
        </h1>
        <div className="flex flex-wrap gap-y-4 rounded-b-lg bg-base-200 p-4 mt-8">
          {category.category.products.length > 0 &&
            category.category.products.map((product: Product) => {
              return (
                <div
                  key={product.id}
                  className="w-full p-2 md:w-[50%] lg:w-[25%]"
                >
                  <div className="card-compact card border border-black bg-base-100 shadow-xl">
                    <figure className="aspect-[1/1] w-full">
                      <LazyLoadImage
                        effect="blur"
                        src="https://placeimg.com/300/200/arch"
                        className=" aspect-[1/1] w-full object-cover"
                      />
                    </figure>
                    <div className="card-body font-bold">
                      <h2 className="card-title justify-center uppercase">
                        {product.name}
                      </h2>
                      <p className="text-center text-sm text-error">
                        {formatPrices(product.price)} / Tháng
                      </p>
                      <p className="text-center text-sm">{product.cpu} CORE</p>
                      <p className="text-center text-sm">{product.ram}GB RAM</p>
                      <p className="text-center text-sm">
                        Băng thông: {product.bandwidth}
                      </p>
                      <p className="text-center text-sm">OS: {product.os}</p>
                      <p
                        className={`text-center text-sm ${
                           getColorStatus(product.status)
                        }`}
                      >
                        Trạng thái: {getStatus(product.status)}
                      </p>
                      <div className="card-actions justify-end">
                        <button className="btn-primary btn w-full">
                          <Link href={product.slug}>Mua Hàng</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </Main>
    </>
  );
};

export default SlugCategory;
