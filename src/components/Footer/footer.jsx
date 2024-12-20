import { mainSite } from "../../utils/secrets";
import { siteTitle } from "../../utils/siteInfo";

const Footer = (props) => {
  return (
    <>
      <footer className="footer footer-center bg-base-100 border-t text-base-content rounded p-10">
        <nav className="flex flex-col lg:flex-row gap-4">
          <a href={`${mainSite}/#about`} className="link link-hover">
            About
          </a>
          <a href={`${mainSite}/#contact`} className="link link-hover">
            Contact
          </a>
          <a href={`${mainSite}/terms`} className="link link-hover">
            Terms & Conditions
          </a>
          <a href={`${mainSite}/policy`} className="link link-hover">
            Privacy Info
          </a>
        </nav>
        {/* <nav>
          <div className="grid grid-flow-col gap-8">
            <a target="blank" href="#">
              <i className="bi bi-twitter-x text-2xl text-base-content"></i>
            </a>
            <a target="blank" href="#">
              <i className="bi bi-linkedin text-2xl text-base-content"></i>
            </a>
            <a target="blank" href="#">
              <i className="bi bi-facebook text-2xl text-base-content"></i>
            </a>
            <a target="blank" href="#">
              <i className="bi bi-instagram text-2xl text-base-content"></i>
            </a>
            <a target="blank" href="#">
              <i className="bi bi-tiktok text-2xl text-base-content"></i>
            </a>
          </div>
        </nav> */}
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by{" "}
            {siteTitle}
          </p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
