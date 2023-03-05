import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { Product } from "../../../model/Product.model";
import { formatPrices } from "../../../until";

interface BuyProps {
  product: Product;
}

const Buy: React.FC<BuyProps> = ({ product }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleBuyProduct = async (product: any) => {
    if (!session) {
      return Swal.fire({
        title: "Bạn chưa đăng nhập!",
        icon: "error",
      });
    }
    if (session.user.money < product.price) {
      return Swal.fire({
        title: "Bạn không đủ tiền!",
        icon: "error",
      });
    }
    return Swal.fire({
      title: "Bạn muốn mua không!",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post("/api/order", { id: product.id }).then((result) => {
          router.push("/");
          Swal.fire({
            title:"Mua thành công",
            icon: "success"
          })
        });
      }
    });
  };
  return (
    <div className="font-medium">
      <h1 className="py-2 font-bold italic underline">-Mua hàng:</h1>
      <div className="flex flex-wrap items-center gap-4">
        <div className="">
          Tổng giá:{" "}
          <span className="italic text-accent-focus">
            {formatPrices(product.price)}
          </span>
        </div>
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Mã giảm giá"
            className="w-auto rounded border-black px-2 focus:border focus:outline-none"
          />
          <button className="btn-primary min-h-8 btn h-8 rounded">
            Áp dụng
          </button>
        </div>
        <div className="">
          <button
            onClick={() => handleBuyProduct(product)}
            className="btn-accent min-h-8 btn h-8 rounded "
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Buy;
