import {
  faCaretDown,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { dataTheme } from "../../../until/index";
import Menu from "../icon/Menu";
import Theme from "../icon/Theme";
import setTheme from "../../hooks/setTheme";
import { SubMenu, Menus } from "../../../model/Menu.model";
import { formatPrices } from "../../../until/index";
interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const { menu, theme, handleChangeTheme } = setTheme();

  const { data: session } = useSession();

  return (
    <div className="fixed z-10 m-auto w-full bg-base-300">
      <div className="navbar m-auto lg:container">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn-ghost btn lg:hidden">
              <Menu />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact fixed mt-3 w-52 bg-base-100 p-2 font-bold shadow"
            >
              {menu &&
                menu.map((item: Menus) => {
                  return item.submenu.length > 0 ? (
                    <li key={item.name} tabIndex={0}>
                      <p>{item.name}</p>
                      <ul className="fixed border border-black bg-base-300 p-2">
                        {item.submenu.map((sub: SubMenu) => {
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
          <Link href="/" className="btn-ghost btn text-xl normal-case">
            cloud<span className="text-primary">VPS</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold">
            {menu &&
              menu.map((item: Menus) => {
                return item.submenu.length > 0 ? (
                  <li key={item.name} tabIndex={0}>
                    <a className="w-full" href="#">
                      {item.name}
                      <FontAwesomeIcon className="w-3" icon={faCaretDown} />
                    </a>

                    <ul className="border border-black bg-base-300 p-2">
                      {item.submenu.map((sub: SubMenu) => {
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
            <div
              tabIndex={0}
              className="btn-ghost btn-circle avatar btn flex h-full"
            >
              <Theme />
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
                className="btn-accent btn-active btn-sm btn-circle btn md:btn-md "
                href="/auth/login"
              >
                <FontAwesomeIcon className="w-4" icon={faRightFromBracket} />
              </Link>
            </>
          )}
          {session && (
            <>
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn-ghost btn-sm btn-circle avatar btn p-0 md:btn-md"
                >
                  <div className="w-10 rounded-full">
                    <LazyLoadImage
                      effect="blur"
                      src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${session.user.name}`}
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 font-medium shadow"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">{session.user.name}</span>
                    </a>
                  </li>
                  <li>
                    <a className="justify-between">
                      Số dư
                      <span className="badge-error badge">
                        {formatPrices(session.user.money)}
                      </span>
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
                    <a>Đăng xuất</a>
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
