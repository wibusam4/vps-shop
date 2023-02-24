import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Product } from "../../../model/Product.model";
import { formatPrices, getColorStatus, getStatus } from "../../../until";

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <div key={product.id} className="w-full p-2 md:w-[50%] lg:w-[25%]">
      <div className="card card-compact border border-black bg-base-100 shadow-xl">
        <figure className="aspect-[1/1] w-full">
          <LazyLoadImage
            effect="blur"
            src="https://photo2.tinhte.vn/data/attachment-files/2021/12/5778108_cloud-server.png"
            className="aspect-[1/1] w-full object-cover"
          />
        </figure>
        <div className="card-body font-bold">
          <h2 className="card-title justify-center uppercase">
            {product.name}
          </h2>
          <p className="text-center text-sm text-error">
            {formatPrices(product.price)} / Tháng
          </p>
          <p className="text-center text-sm">{product.cpu} CORE</p>
          <p className="text-center text-sm">{product.ram}GB RAM</p>
          <p className="text-center text-sm">Băng thông: {product.bandwidth}</p>
          <p className="text-center text-sm">OS: {product.os}</p>
          <p
            className={`text-center text-sm ${getColorStatus(product.status)}`}
          >
            Trạng thái: {getStatus(product.status)}
          </p>
          <div className="card-actions justify-end">
            <Link className="btn-primary btn w-full" href={product.slug}>
              Mua Hàng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
