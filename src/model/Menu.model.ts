export interface SubMenu {
  name: string;
  slug: string;
}

export interface Menus {
  name: string;
  slug: string;
  submenu: SubMenu[];
}
