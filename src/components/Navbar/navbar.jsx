import Themes from "../Themes/themes";
import NavLinksTwo from "./navlinksTwo";
import NavLinksOne from "./navlinksOne";
import { siteTitle } from "../../utils/siteInfo";

const Navbar = (props) => {
  return (
    <>
      <div className="navbar bg-base-200 top-0 sticky w-full z-[1]">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-sm btn-ghost lg:hidden">
              <i class="bi bi-list text-2xl"></i>
            </div>
            <NavLinksTwo />
          </div>
          <a href="/" className="btn btn-sm btn-ghost text-2xl">{siteTitle}</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <NavLinksOne />
        </div>
        <div className="navbar-end items-center">
          <Themes />
        </div>
      </div>
    </>
  );
};

export default Navbar;
