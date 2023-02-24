import { GetStaticPaths, GetStaticProps } from "next";
import Main from "../../components/basic/layouts/Main";
import Meta from "../../components/basic/layouts/Meta";
import Card from "../../components/basic/product/Card";
import { Category } from "../../model/Category.model";
import { prisma } from "../../server/db";

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
        <div className="mt-8 flex flex-wrap gap-y-4 rounded-b-lg bg-base-200 p-4">
          {category.category.products.length > 0 &&
            category.category.products.map((product) => {
              return (
                <Card key={product.id} product={product} />
              );
            })}
        </div>
      </Main>
    </>
  );
};

export default SlugCategory;
