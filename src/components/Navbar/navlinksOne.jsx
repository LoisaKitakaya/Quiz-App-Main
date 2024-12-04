import { mainSite } from "../../utils/secrets";

const NavLinksOne = (props) => {
  return (
    <>
      <ul className="menu menu-horizontal px-1 menu-sm">
        <li>
          <a href={`${mainSite}/#coach`}>Coach</a>
        </li>
        <li>
          <a href={`${mainSite}/#quiz`}>Quiz</a>
        </li>
        <li>
          <a href={`${mainSite}/#about`}>About</a>
        </li>
        <li>
          <a href={`${mainSite}/#faqs`}>FAQs</a>
        </li>
        <li>
          <a href={`${mainSite}/#contact`}>Contact</a>
        </li>
      </ul>
    </>
  );
};

export default NavLinksOne;
