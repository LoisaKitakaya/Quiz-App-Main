import { For } from "solid-js";
import { setAppTheme } from "../../utils/themeStore";
import ThemeIcon from "../../assets/icons8-theme-94.png";

const themes = [
  { name: "lofi", hexCode: "#ffffff" },
  { name: "black", hexCode: "#000000" },
  { name: "corporate", hexCode: "#ffffff" },
  { name: "business", hexCode: "#202020" },
  { name: "retro", hexCode: "#ece3ca" },
  { name: "coffee", hexCode: "#20161f" },
  { name: "valentine", hexCode: "#fae7f4" },
  { name: "cyberpunk", hexCode: "#fff248" },
  // { name: "aqua", hexCode: "#345da7" },
  // { name: "pastel", hexCode: "#f3f4f6" },
  // { name: "forest", hexCode: "#228B22" },
  // { name: "light", hexCode: "#ffffff" },
  // { name: "dark", hexCode: "#18181b" },
  // { name: "cupcake", hexCode: "#f2c4de" },
  // { name: "bumblebee", hexCode: "#e0a82e" },
  // { name: "emerald", hexCode: "#10b981" },
  // { name: "synthwave", hexCode: "#bf00ff" },
  // { name: "halloween", hexCode: "#f28c18" },
  // { name: "garden", hexCode: "#43a047" },
  // { name: "fantasy", hexCode: "#fcdbdd" },
  // { name: "wireframe", hexCode: "#bdbdbd" },
  // { name: "luxury", hexCode: "#231b2e" },
  // { name: "dracula", hexCode: "#6272a4" },
  // { name: "cmyk", hexCode: "#00a1f1" },
  // { name: "autumn", hexCode: "#d2691e" },
  // { name: "acid", hexCode: "#a2e027" },
  // { name: "lemonade", hexCode: "#fef08a" },
  // { name: "night", hexCode: "#2a2e37" },
  // { name: "winter", hexCode: "#a7d6ff" },
  // { name: "dim", hexCode: "#35363a" },
  // { name: "nord", hexCode: "#5e81ac" },
  // { name: "sunset", hexCode: "#ff758f" },
];

// component
const Themes = (props) => {
  const handleThemeChange = (theme) => {
    setAppTheme(theme);
  };

  return (
    <>
      <div className="dropdown dropdown-bottom dropdown-end w-[30px] h-[30px]">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-square btn-sm btn-ghost"
        >
          <img className="w-full" src={ThemeIcon} alt="theme icon" />
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] w-40 p-2 shadow mt-5 border"
        >
          <For each={themes}>
            {(theme) => (
              <li className="mb-2">
                <button
                  class="btn btn-sm flex justify-between items-center gap-2"
                  onClick={() => handleThemeChange(theme.name)}
                >
                  <span>{theme.name}</span>
                  <span
                    className="border"
                    style={{
                      "background-color": `${theme.hexCode}`,
                      width: "24px",
                      height: "24px",
                      "border-radius": "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </button>
              </li>
            )}
          </For>
        </ul>
      </div>
    </>
  );
};

export default Themes;
