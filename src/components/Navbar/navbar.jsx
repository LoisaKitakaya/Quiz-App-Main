import { siteTitle } from "../../utils/siteInfo";

const Navbar = (props) => {
  const question = props.question;

  return (
    <>
      <div className="navbar bg-base-100 shadow">
        <div className="navbar-start">
          <Show when={question.has_previous}>
            <div className="tooltip tooltip-right" data-tip="Previous">
              <button
                className="btn btn-sm btn-ghost btn-circle"
                onClick={props.handlePrevious}
              >
                <i class="bi bi-arrow-left text-xl"></i>
              </button>
            </div>
          </Show>
        </div>
        <div className="navbar-center">
          <a className="btn btn-sm btn-ghost rounded-lg text-xl">{siteTitle}</a>
        </div>
        <div className="navbar-end"></div>
      </div>
    </>
  );
};

export default Navbar;
