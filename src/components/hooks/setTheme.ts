import axios from "axios";
import { useEffect, useState } from "react";
import { getLocal, setLocal } from "../../until";

const setTheme = () => {
  const [menu, setMenu] = useState([]);
  const [theme, setTheme] = useState("emerald");
  const getMenu = async () => {
    const response = await axios.get("/api/menu");
    setMenu(response.data);
  };
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
  return {
    menu,
    theme,
    handleChangeTheme,
  };
};
export default setTheme;
