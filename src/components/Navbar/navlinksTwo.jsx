import { mainSite } from "../../utils/secrets";

const NavLinksTwo = (props) => {
  return (
    <>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] w-40 p-2 shadow mt-5 border"
      >
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

export default NavLinksTwo;
