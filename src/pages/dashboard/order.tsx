import { requireAdmin } from "../../common/authAdmin";
import Main from "../../components/dashboard/layouts/Main";
import { prisma } from "../../server/db";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import moment from "moment";
import { formatPrices } from "../../until";;
import { requireCtv } from "../../common/authCtv";
import { Order } from "../../model/Order.model";

interface OrderProps {
  orders: Order[];
}

const Order: React.FC<OrderProps> = ({ orders }) => {
  return (
    <Main>
      <div className="flex flex-col gap-y-4 p-6">
        <div className="flex flex-wrap justify-between gap-y-4 gap-x-4">
          <div className="form-control">
            <label className="input-group">
              <span>Search</span>
              <input
                type="text"
                placeholder="info@site.com"
                className="input-bordered input focus:outline-none"
              />
            </label>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tài Khoản</th>
                  <th>Sản Phẩm</th>
                  <th>Danh Mục</th>
                  <th>CPU</th>
                  <th>Ram</th>
                  <th>Giá</th>
                  <th>Ngày Tạo</th>
                  <th>Ngày Sửa</th>
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
                        <td>{order.product.category.name}</td>
                        <td>{order.product.ram}</td>
                        <td>{order.product.cpu}</td>
                        <td>{formatPrices(order.product.price)}</td>
                        <td>{moment(order.createdAt).format("DD-MM-YYYY")}</td>
                        <td>{moment(order.updatedAt).format("DD-MM-YYYY")}</td>
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

export const getServerSideProps = requireCtv(async (ctx) => {
  const orders = JSON.parse(
    JSON.stringify(
      await prisma.order.findMany({
        include: {
          user: {
            select: {
              name: true,
            },
          },
          product: {
            include: {
                category: true
            }
          },
        },
      })
    )
  );
  return { props: { orders } };
});
