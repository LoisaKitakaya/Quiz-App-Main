const NavLinksTwo = (props) => {
  return (
    <>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] w-40 p-2 shadow mt-5 border"
      >
        <li>
          <a href="/#coach">Coach</a>
        </li>
        <li>
          <a href="/#quiz">Quiz</a>
        </li>
        <li>
          <a href="/#about">About</a>
        </li>
        <li>
          <a href="/#faqs">FAQs</a>
        </li>
        <li>
          <a href="/#contact">Contact</a>
        </li>
      </ul>
    </>
  );
};

export default NavLinksTwo;
