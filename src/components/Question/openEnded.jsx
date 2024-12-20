import toast from "solid-toast";
import { createSignal } from "solid-js";
import Profile from "../Profile/profile";
import { openModal } from "../../utils/modalStore";
import { profileStatus } from "../../utils/authStore";
import { saveAnswer } from "../../utils/trackProgress";

const OpenEnded = (props) => {
  const question = props.question;
  const [formData, setFormData] = createSignal(null);

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      saveAnswer({
        username: "",
        question_id: question.id,
        selected_option: null,
        text: formData(),
      });

      if (question.has_next) {
        props.handleNext();
      }
    } catch (error) {
      toast.error(
        `An unexpected error occurred: ${error}. Please try again later.`
      );
    }
  };

  return (
    <>
      {/* {question.question_type === "open_ended" && (
        <>
        </>
      )} */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4 mt-6"></div>

        <textarea
          required
          onChange={handleChange}
          placeholder="Your answer here"
          className="textarea textarea-bordered w-full h-32"
        ></textarea>

        <div className="mb-4 mt-6"></div>

        <div className="flex flex-col gap-4 justify-between item-center w-full">
          <Switch>
            <Match when={question.next_index}>
              <button type="submit" className="btn btn-success w-full">
                Next
              </button>
            </Match>
            <Match when={!question.next_index}>
              <button type="submit" className="btn btn-success w-full">
                Complete & Submit
              </button>
            </Match>
          </Switch>
        </div>
      </form>
    </>
  );
};

export default OpenEnded;
