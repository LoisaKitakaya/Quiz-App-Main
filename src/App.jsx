import { Toaster } from "solid-toast";
import { createEffect } from "solid-js";
import { theme } from "./utils/themeStore";
import Footer from "./components/Footer/footer";
import Navbar from "./components/Navbar/navbar";
import Modal from "./components/Modal/modal";

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

      <Modal />
    </>
  );
};

export default App;
