import { requireAuth } from "../../common/authAdmin";
import Main from "../../components/dashboard/layouts/Main";
import { prisma } from "../../server/db";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import moment from "moment";
import { getBageStatus } from "../../until";
import Modal from "../../components/dashboard/Modal";
import AddCategory from "../../components/dashboard/form/AddCategory";
import EditCategory from "../../components/dashboard/form/EditCategory";
import { Category } from "../../model/Category.model";

export interface RootObject {
  categories: Category[];
}

const Category: React.FC<RootObject> = (categories) => {
  const router = useRouter();

  const handelDelete = async (category: any) => {
    Swal.fire({
      title: `Bạn muốn xóa ID: ${category.id}`,
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("/api/categories", { data: { id: category.id } })
          .then(() => {
            router.push(router.asPath);
            Swal.fire({
              text: "Xóa thành công",
              icon: "success",
            });
          });
      }
    });
  };
  return (
    <Main>
      <div className="flex flex-col gap-y-4 p-6">
        <div className="flex flex-wrap justify-between gap-y-4 gap-x-4">
          <Modal id="add-category" name="Thêm Danh Mục">
            <AddCategory />
          </Modal>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Ngày Tạo</th>
                  <th>Ngày Sửa</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody className="border">
                {categories &&
                  categories?.categories.map((category: any) => (
                    <tr key={category.id}>
                      <th>{category.id}</th>
                      <td>{category.name}</td>
                      <td>{category.slug}</td>
                      <td>
                        <div className={getBageStatus(category.status)}>
                          {category.status}
                        </div>
                      </td>
                      <td>{moment(category.createdAt).format("DD-MM-YYYY")}</td>
                      <td>{moment(category.updatedAt).format("DD-MM-YYYY")}</td>
                      <td className="flex gap-x-2">
                        <Modal id={category.id} name="Sửa">
                          <EditCategory category={category} />
                        </Modal>
                        <button
                          onClick={() => {
                            handelDelete(category);
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
export default Category;

export const getServerSideProps = requireAuth(async (ctx) => {
  const categories = JSON.parse(
    JSON.stringify(await prisma.category.findMany())
  );

  return { props: { categories } };
});
