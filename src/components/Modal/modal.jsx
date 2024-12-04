import { closeModal, globalModal } from "../../utils/modalStore";

const Modal = () => {
  return (
    <dialog id="global_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={closeModal}
        >
          <i class="bi bi-x-lg"></i>
        </button>

        <h3 className="font-bold text-lg">{globalModal.title}</h3>

        <div className="my-4">{globalModal.content}</div>

        <p className="font-thin text-xs italic text-center">
          Press <kbd className="kbd kbd-xs">ESC</kbd> key or click the{" "}
          <strong>'X'</strong> button to close
        </p>
      </div>
    </dialog>
  );
};

export default Modal;
