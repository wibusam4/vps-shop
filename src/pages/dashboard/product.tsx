import EditProduct from "../../components/dashboard/form/EditProduct";
import AddProduct from "../../components/dashboard/form/AddProduct";
import Main from "../../components/dashboard/layouts/Main";
import { Category } from "../../model/Category.model";
import { requireCtv } from "../../common/authCtv";
import { Product } from "../../model/Product.model";
import { prisma } from "../../server/db";
import { formatPrices, getBageStatus, menuProduct } from "../../until";
import Modal from "../../components/dashboard/Modal";
import moment from "moment";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/router";

interface RootObject {
  products: Product[];
  category: Category[];
}

const Product: React.FC<RootObject> = (data) => {
  const router = useRouter();
  const handelDelete = async (product: any) => {
    Swal.fire({
      title: `Bạn muốn xóa ID: ${product.id}`,
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("/api/products", { data: { id: product.id } })
          .then(() => {
            router.push(router.asPath);
            Swal.fire({
              text: "Xóa thành công",
              icon: "success",
            });
          })
      }
    });
  };
  return (
    <Main>
      <div className="flex flex-col gap-y-4 p-6">
        <div className="flex flex-wrap justify-between gap-y-4 gap-x-4">
          <Modal id="add-product" name="Thêm Sản Phẩm">
            <AddProduct categories={data.category} />
          </Modal>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  {menuProduct().map((menu, index) => {
                    return <th key={index}>{menu}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {data.products &&
                  data.products.map((product: any, index) => (
                    <tr key={product.id} className="font-medium">
                      <th className="max-w-[100px] overflow-hidden">{index}</th>
                      <td>{product.name}</td>
                      <td>{product.category.name}</td>
                      <td className="text-accent">
                        {formatPrices(product.price)}
                      </td>
                      <td>{product.cpu}</td>
                      <td>{product.ram}</td>
                      <td>{product.os}</td>
                      <td>{product.bandwidth}</td>
                      <td>{product.slug}</td>
                      <td>
                        <div className={getBageStatus(product.status)}>
                          {product.status}
                        </div>
                      </td>
                      <td>{moment(product.createdAt).format("DD-MM-YYYY")}</td>
                      <td>{moment(product.updatedAt).format("DD-MM-YYYY")}</td>
                      <td className="flex gap-x-2">
                        <Modal id={product.id} name={"Sửa"}>
                          <EditProduct
                            product={product}
                            categories={data.category}
                          />
                        </Modal>
                        <button
                          onClick={() => {
                            handelDelete(product);
                          }}
                          className="btn-accent btn"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Main>
  );
};
export default Product;

export const getServerSideProps = requireCtv(async (ctx) => {
  const products = JSON.parse(
    JSON.stringify(
      await prisma.product.findMany({ include: { category: true } })
    )
  );
  const category = JSON.parse(JSON.stringify(await prisma.category.findMany()));
  return { props: { category, products } };
});
