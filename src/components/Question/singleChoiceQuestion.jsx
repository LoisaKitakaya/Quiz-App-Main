import toast from "solid-toast";
import { createSignal } from "solid-js";
import Profile from "../Profile/profile";
import { openModal } from "../../utils/modalStore";
import { profileStatus } from "../../utils/authStore";
import { saveAnswer } from "../../utils/trackProgress";

const SingleChoiceQuestion = (props) => {
  const question = props.question;

  const [formData, setFormData] = createSignal(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      saveAnswer({
        username: "",
        question_id: question.id,
        selected_option: formData(),
        text: null,
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

  const handleChange = async (e) => {
    setFormData(e.target.value);

    await handleSubmit(e);
  };

  return (
    <>
      {/* {question.question_type === "single_choice" && (
        <>
        </>
      )} */}
      <form>
        <div className="mb-4 mt-6"></div>

        <For each={question.options}>
          {(item) => (
            <div className="card bg-base-100 w-full rounded-xl mb-4 cursor-pointer border">
              <div className="card-body p-2 cursor-pointer">
                <label className="form-control w-full flex flex-row justify-between gap-2 items-center cursor-pointer">
                  <div className="label">
                    <span>{item.option}</span>
                  </div>
                  <input
                    required
                    type="radio"
                    name="answer"
                    value={item.id}
                    onChange={handleChange}
                    className="radio radio-md cursor-pointer"
                  />
                </label>
              </div>
            </div>
          )}
        </For>
      </form>
    </>
  );
};

export default SingleChoiceQuestion;
