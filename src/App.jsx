import { Toaster } from "solid-toast";
import { createEffect } from "solid-js";
import { theme } from "./utils/themeStore";
import Modal from "./components/Modal/modal";
import Footer from "./components/Footer/footer";

const App = (props) => {
  createEffect(() => {
    document.documentElement.setAttribute("data-theme", theme.value);
  });

  return (
    <>
      <div className="min-h-screen">{props.children}</div>

      <Footer />

      <Toaster position="top-center" />

      <Modal />
    </>
  );
};

export default App;
