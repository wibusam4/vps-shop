import {
  faHome,
  faUser,
  faShop,
  faBagShopping,
  faCreditCard,
  faChartLine,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ItemMenu from "../ItemMenu";

const Menu = [
  { name: "Dashboard", link: "/dashboard", icon: faHome },
  { name: "Thành Viên", link: "/dashboard/user", icon: faUser },
  { name: "Sản Phẩm", link: "/dashboard/product", icon: faShop },
  { name: "Category", link: "/dashboard/category", icon: faBagShopping },
  {
    name: "Đơn Hàng",
    link: "/dashboard/order",
    icon: faCartShopping,
  },
  { name: "Dòng Tiền", link: "/dashboard/transaction", icon: faChartLine },
  { name: "Momo", link: "/dashboard/momo", icon: faCreditCard },
];
const Sidebar: React.FC = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <aside className="w-[260px] bg-base-200">
        <div className="sticky top-0 z-20 items-center gap-2 bg-base-200 bg-opacity-90 px-4 py-2 backdrop-blur">
          <Link
            href="/"
            aria-current="page"
            aria-label="Homepage"
            className="flex-0 btn-ghost btn px-2"
          >
            <div className="font-title inline-flex text-lg text-primary transition-all duration-200 md:text-3xl">
              <span className="lowercase">Admin</span>
              <span className="uppercase text-base-content">UI</span>
            </div>
          </Link>
        </div>
        <div className="h-4"></div>

        <ul className="menu menu-compact flex flex-col p-0 px-4">
          {Menu.map((item, index) => {
            return (
              <ItemMenu
                key={index}
                name={item.name}
                link={item.link}
                icon={item.icon}
              />
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
