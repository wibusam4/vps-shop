import Main from "../../../components/dashboard/layouts/Main";
import { prisma } from "../../../server/db";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import moment from "moment";
import { formatPrices } from "../../../until";
import { requireCtv } from "../../../common/authCtv";
import { Order } from "../../../model/Order.model";
import { useSession } from "next-auth/react";

interface OrderProps {
  orders: Order[][];
}

const status = ["Đang đặt hàng", "Đợi nhận đơn", "Chưa thêm acc", "Đã xong "];
const color = ["badge", "badge-warning", "badge-accent", "badge-secondary"]

const Order: React.FC<OrderProps> = ({ orders }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const handelDelete = async (order: any) => {
    Swal.fire({
      title: `Xóa đơn : ${order.product.name}`,
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("/api/order", { data: { id: order.id } })
          .then(() => {
            router.push(router.asPath);
            Swal.fire({
              text: "Xóa thành công",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              text: error,
            });
          });
      }
    });
  };
  const handelReceive = async (order: any) => {
    Swal.fire({
      title: `Nhận đơn : ${order.product.name}`,
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put("/api/order", { action: `receive`, id: order.id })
          .then(() => {
            router.push(router.asPath);
            Swal.fire({
              text: "Nhận thành công",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              text: error,
            });
          });
      }
    });
  };
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
                  <th>Người mua</th>
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
                  orders[0]?.map((order, index) => {
                    return (
                      <tr key={index}>
                        <th>{index}</th>
                        <td>{order.user.email}</td>
                        <td>{order.product.name}</td>
                        <td>{order.product.category?.name}</td>
                        <td>{order.product.ram}</td>
                        <td>{order.product.cpu}</td>
                        <td className="text-accent-focus">
                          {formatPrices(order.product.price)}
                        </td>
                        <td>{moment(order.createdAt).format("DD-MM-YYYY")}</td>
                        <td>{moment(order.updatedAt).format("DD-MM-YYYY")}</td>
                        <td className="flex gap-x-2">
                          <button
                            onClick={() => {
                              handelReceive(order);
                            }}
                            className="btn-secondary btn"
                          >
                            Nhận đơn
                          </button>
                          <button
                            onClick={() => {
                              handelDelete(order);
                            }}
                            className="btn-accent btn"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-y-4 gap-x-4">
          <div className="form-control">
            <label className="input-group">
              <span className="bg-warning p-1">Tổng đơn</span>
            </label>
          </div>
        </div>
        <div>
          <div className="mt-2 overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Người mua</th>
                  <th>Sản Phẩm</th>
                  <th>Danh Mục</th>
                  <th>CPU</th>
                  <th>Ram</th>
                  <th>Giá</th>
                  <th>Người bán</th>
                  <th>Trạng thái</th>
                  <th>Ngày Tạo</th>
                  <th>Ngày Nhận Đơn</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody className="border">
                {orders &&
                  orders[1]?.map((order, index) => {
                    return (
                      <tr key={index}>
                        <th>{index}</th>
                        <td>{order.user.email}</td>
                        <td>{order.product.name}</td>
                        <td>{order.product.category?.name}</td>
                        <td>{order.product.ram}</td>
                        <td>{order.product.cpu}</td>
                        <td className="text-accent">
                          {formatPrices(order.product.price)}
                        </td>
                        <td>{order.seller?.email ?? "loading"}</td>
                        <td>
                          <div className={`badge ${color[order.status]}`}>
                            {status[order.status]}
                          </div>
                        </td>
                        <td>{moment(order.createdAt).format("DD/MM/YYYY")}</td>
                        <td>
                          {moment(order.updatedAt).format("DD/MM/YYYY HH:MMp")}
                        </td>
                        <td className="flex gap-x-2">
                          <button
                            onClick={() => {
                              handelDelete(order);
                            }}
                            className="btn-accent btn"
                          >
                            Xóa
                          </button>
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

export const getServerSideProps = requireCtv(async (ctx) => {
  const orders = JSON.parse(
    JSON.stringify(
      await prisma.$transaction([
        prisma.order.findMany({
          where: {
            status: 1,
          },
          include: {
            user: {
              select: {
                email: true,
              },
            },
            product: {
              include: {
                category: true,
              },
            },
          },
        }),
        prisma.order.findMany({
          include: {
            user: {
              select: {
                email: true,
              },
            },
            seller: {
              select: {
                email: true,
              },
            },
            product: {
              include: {
                category: true,
              },
            },
          },
        }),
      ])
    )
  );
  return { props: { orders } };
});
