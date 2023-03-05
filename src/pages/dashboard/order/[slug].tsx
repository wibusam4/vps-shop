import Main from "../../../components/dashboard/layouts/Main";
import { prisma } from "../../../server/db";
import { Order } from "../../../model/Order.model";
import { requireAdmin } from "../../../common/authAdmin";
import moment from "moment";
import { formatPrices } from "../../../until";
import Modal from "../../../components/dashboard/Modal";
import InforOrder from "../../../components/dashboard/form/InforOrder";

interface OrderProps {
  orders: Order[];
}

const Order: React.FC<OrderProps> = ({ orders }) => {
  const handleShowOrder = (order: any) => {};
console.log(orders);

  return (
    <Main>
      <div className="flex flex-col gap-y-4 p-6">
        <div className="flex flex-wrap justify-between gap-y-4 gap-x-4">
          <div className="form-control">
            <label className="input-group">
              <span className="bg-error p-1">Đơn hàng chưa nhận</span>
            </label>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Người Mua</th>
                  <th>Sản Phẩm</th>
                  <th>Danh Mục</th>
                  <th>CPU</th>
                  <th>Ram</th>
                  <th>Giá</th>
                  <th>Ngày Tạo</th>
                  <th>Ngày nhận</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody className="border">
                {orders &&
                  orders?.map((order, index) => {
                    return (
                      <tr key={index}>
                        <th>{index}</th>
                        <td>{order.user.name}</td>
                        <td>{order.product.name}</td>
                        <td>{order.product.category?.name}</td>
                        <td>{order.product.ram}</td>
                        <td>{order.product.cpu}</td>
                        <td>{formatPrices(order.product.price)}</td>
                        <td>{moment(order.createdAt).format("DD-MM-YYYY")}</td>
                        <td>
                          {moment(order.updatedAt).format("DD-MM-YYYY hh:mmp")}
                        </td>
                        <td className="flex gap-x-2">
                          <Modal id={order.id} name={"Chi Tiết"}>
                            <InforOrder order={order} />
                          </Modal>
                          <button className="btn-secondary btn">
                            Nhận đơn
                          </button>
                          <button className="btn-accent btn">Xóa</button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Order;

export const getServerSideProps = requireAdmin(async (ctx) => {
  const slug = ctx.query.slug as string;
  const orders = JSON.parse(
    JSON.stringify(
      await prisma.order.findMany({
        where: {
          seller: slug,
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
          product: {
            include: {
              category: true,
            },
          },
          account: true,
        },
      })
    )
  );

  return { props: { orders } };
});
