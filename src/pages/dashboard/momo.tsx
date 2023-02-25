import { requireAdmin } from "../../common/authAdmin";
import Main from "../../components/dashboard/layouts/Main";
import { prisma } from "../../server/db";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import moment from "moment";
import { getBageStatus } from "../../until";
import Modal from "../../components/dashboard/Modal";
import { Momo } from "../../model/Momo.model";

export interface RootObject {
  transMomo: Momo[];
}

const Momo: React.FC<RootObject> = ({ transMomo }) => {
  console.log(transMomo);

  return (
    <Main>
      <div className="flex flex-col gap-y-4 p-6">
        <div className="flex flex-wrap justify-between gap-y-4 gap-x-4">
          {/* <Modal id="add-category" name="Thêm Danh Mục">
              <AddCategory />
            </Modal> */}
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Ngày Tạo</th>
                  <th>Ngày Sửa</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody className="border"></tbody>
            </table>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Momo;

export const getServerSideProps = requireAdmin(async (ctx) => {
  const transMomo = JSON.parse(
    JSON.stringify(await prisma.transMomo.findMany())
  );

  return { props: { transMomo } };
});
