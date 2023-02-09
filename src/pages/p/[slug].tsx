import { GetStaticPaths, GetStaticProps } from "next";
import Main from "../../components/basic/layouts/Main";
import Meta from "../../components/basic/layouts/Meta";
import { prisma } from "../../server/db";
import { Product } from "../../model/Product.model";
import { Category } from "@prisma/client";
import { formatPrices, getStatus } from "../../until";
import Row from "../../components/basic/product/Row";
import Buy from "../../components/basic/product/Buy";

interface SlugProductProps {
  product: Product;
  category: Category;
}

const SlugProduct: React.FC<SlugProductProps> = (product) => {
  return (
    <>
      <Meta title="" description="" />
      <Main>
        <div className="collapse-title rounded-t-lg bg-primary text-xl font-bold text-primary-content">
          Sản Phẩm:{" "}
          <span className="italic text-accent-focus">
            {product.product.name} - {product.product.category?.name}
          </span>
        </div>
        <div className="flex w-full flex-col gap-y-4 rounded-b-lg bg-base-200 p-4">
          <Buy product={product.product} />
          <div className="border border-t-black font-medium">
            <h1 className="py-2 font-bold italic underline">
              -Thông số chi tiết:
            </h1>
            <Row title="RAM" value={`${product.product.ram} GB`} />
            <Row title="CPU" value={product.product.cpu.toString()} />
            <Row title="Băng thông" value={product.product.bandwidth} />
            <Row title="OS" value={product.product.os} />
            <Row title="Giá" value={formatPrices(product.product.price)} />
            <Row title="Trạng thái" value={getStatus(product.product.status)} />
          </div>
        </div>
      </Main>
    </>
  );
};

export default SlugProduct;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = `/p/${params?.slug as string}`;

  if (!slug) {
    return {
      notFound: true,
    };
  }
  const product = JSON.parse(
    JSON.stringify(
      await prisma.product.findFirst({
        where: { slug },
        include: {
          category: true,
        },
      })
    )
  );
  return {
    props: {
      product,
    },
    revalidate: 60,
  };
};
