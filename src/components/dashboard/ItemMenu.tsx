import Link from "next/dist/client/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
interface ItemMenuProps {
  name: string;
  link: string;
  icon: IconDefinition;
}

const ItemMenu: React.FC<ItemMenuProps> = ({ name, link, icon }) => {
  const orders = async () => {
    const order = await axios.get("/api/order").then((result) => {
      setOrder(result.data.message);
    });
  };
  const [order, setOrder] = useState();
  useEffect(() => {
    if (name === "Đơn Hàng") {
      orders();
    }
  }, []);
  return (
    <li>
      <Link className="flex gap-4 px-2 py-4 font-medium" href={link}>
        <span className="flex-none">
          <FontAwesomeIcon icon={icon} className="h-5 w-5" />
        </span>
        <span className="flex-1">{name}</span>
        {order && name === "Đơn Hàng" && (
          <span className="badge-error badge">+{order}</span>
        )}
      </Link>
    </li>
  );
};

export default ItemMenu;
