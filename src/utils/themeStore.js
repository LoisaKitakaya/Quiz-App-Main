import Cookies from "js-cookie";
import { createStore } from "solid-js/store";

const initialTheme = Cookies.get("theme") || "lofi";

const [theme, setTheme] = createStore({ value: initialTheme });

const setAppTheme = (appTheme) => {
  document.documentElement.setAttribute("data-theme", appTheme);

  setTheme({ value: appTheme });

  Cookies.set("theme", appTheme);
};

export { setAppTheme, theme };
