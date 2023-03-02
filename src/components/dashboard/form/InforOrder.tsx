import moment from "moment";
import { Order } from "../../../model/Order.model";

interface InforOrderProps {
  order: Order;
}

const InforOrder: React.FC<InforOrderProps> = ({ order }) => {
  return (
    <div className="">
      <div className="grid grid-cols-8 border border-black">
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">ID</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">{order.id}</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">Người mua</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">{order.user.name}</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">Sản phẩm</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">{order.product.name}</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">Ram</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">{order.product.ram}</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">Cpu</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">{order.product.cpu}</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">Giá</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">{order.product.price}</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">Danh mục</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">{order.product.category.name}</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">Trạng thái</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">{order.status}</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">IP</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">{order.account?.ip}</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">Tài khoản</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">{order.account?.user}</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">Mật khẩu</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">{order.account?.password}</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">Ngày nhận đơn</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">{moment(order.updatedAt).format("DD-MM-YYYY hh:mmp")}</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">Ngày tạo đơn</h1>
        <h1 className="col-span-4 border border-black p-2 overflow-hidden">{moment(order.createdAt).format("DD-MM-YYYY hh:mmp")}</h1>
        
      </div>
    </div>
  );
};

export default InforOrder;
