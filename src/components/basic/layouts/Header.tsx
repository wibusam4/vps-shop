import { faCaretDown, faTableList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getLocal, setLocal } from "../../../until/index";
interface HeaderProps {}

export interface Submenu {
  name: string;
  slug: string;
}

export interface RootObject {
  name: string;
  slug: string;
  submenu: Submenu[];
}

export const dataTheme = [
  "dracula",
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

const Header: React.FC<HeaderProps> = ({}) => {
  const [theme, setTheme] = React.useState("emerald");
  const { data: session } = useSession();
  const getMenu = async () => {
    const response = await axios.get("/api/menu");
    setMenu(response.data);
  };
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getMenu();
    document
      ?.querySelector("html")
      ?.setAttribute("data-theme", getLocal("data-theme"));
    setTheme(getLocal("data-theme"));
  }, []);
  
  const handleChangeTheme = (newTheme: string) => {
    document?.querySelector("html")?.setAttribute("data-theme", newTheme);
    localStorage && setLocal("data-theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="fixed z-10 m-auto w-full bg-base-200">
      <div className="navbar m-auto lg:container">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn-ghost btn lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact fixed mt-3 w-52 bg-base-100 p-2 font-bold shadow"
            >
              {menu &&
                menu.map((item: RootObject) => {
                  return item.submenu.length > 0 ? (
                    <li key={item.name} tabIndex={0}>
                      <p>{item.name}</p>
                      <ul className="fixed border border-black bg-base-300 p-2">
                        {item.submenu.map((sub: Submenu) => {
                          return (
                            <li key={sub.name}>
                              <a>{sub.name}</a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  ) : (
                    <li key={item.name}>
                      <Link href={item.slug}>{item.name}</Link>
                    </li>
                  );
                })}
            </ul>
          </div>
          <a className="btn-ghost btn text-xl normal-case">
            cloud<span className="text-primary">VPS</span>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold">
            {menu &&
              menu.map((item: RootObject) => {
                return item.submenu.length > 0 ? (
                  <li key={item.name} tabIndex={0}>
                    <a className="w-full" href="#">
                      {item.name}
                      <FontAwesomeIcon className="w-3" icon={faCaretDown} />
                    </a>

                    <ul className="border border-black bg-base-300 p-2">
                      {item.submenu.map((sub: Submenu) => {
                        return (
                          <li key={sub.name}>
                            <Link href={`/${sub.slug}`}>{sub.name}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ) : (
                  <li key={item.name}>
                    <Link href={item.slug}>{item.name}</Link>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="navbar-end gap-x-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className=" btn-primary avatar btn p-2">
              Theme
            </div>
            <div
              tabIndex={0}
              className="dropdown-content rounded-box menu-compact menu-vertical mt-3 max-h-[300px] w-40 overflow-y-scroll bg-base-100 p-2 shadow"
            >
              {dataTheme.map((item) => (
                <div
                  key={item}
                  onClick={() => handleChangeTheme(item)}
                  className={`block w-full cursor-pointer rounded-md py-1 capitalize ${
                    theme === item && "bg-primary px-2"
                  } `}
                >
                  <a>{item}</a>
                </div>
              ))}
            </div>
          </div>
          {!session && (
            <>
              <Link
                className="btn-accent btn-active btn"
                href="/auth/login"
                target=""
              >
                <h3 className="text-xl font-bold">Đăng Nhập</h3>
              </Link>
            </>
          )}
          {session && (
            <>
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn-ghost btn-circle avatar btn border border-black"
                >
                  <div className="w-10 rounded-full">
                    <LazyLoadImage
                      effect="blur"
                      src="https://placeimg.com/80/80/people"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">{session.user.name}</span>
                    </a>
                  </li>
                  {(session.user.role === "ADMIN" ||
                    session.user.role === "CTV") && (
                    <li>
                      <Link className="" href="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li onClick={() => signOut()}>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
