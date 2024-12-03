import { Toaster } from "solid-toast";
import { createEffect } from "solid-js";
import { theme } from "./utils/themeStore";
import Footer from "./components/Footer/footer";
import Navbar from "./components/Navbar/navbar";

const App = (props) => {
  createEffect(() => {
    document.documentElement.setAttribute("data-theme", theme.value);
  });

  return (
    <>
      <Navbar />

      <div className="min-h-screen">{props.children}</div>

      <Footer />

      <Toaster position="top-center" />
    </>
  );
};

export default App;
