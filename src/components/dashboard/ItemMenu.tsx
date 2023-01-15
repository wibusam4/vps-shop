import Link from "next/dist/client/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
interface ItemMenuProps {
  name: string;
  link: string;
  icon: IconDefinition;
}

const ItemMenu: React.FC<ItemMenuProps> = ({ name, link, icon }) => {
  return (
    <li>
      <Link className="flex gap-4 font-medium px-2 py-4" href={link}>
        <span className="flex-none">
        <FontAwesomeIcon icon={icon} className="w-5 h-5" />
        </span>
        <span className="flex-1">{name}</span>
      </Link>
    </li>
  );
};

export default ItemMenu;
