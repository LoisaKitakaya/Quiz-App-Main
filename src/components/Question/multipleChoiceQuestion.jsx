import toast from "solid-toast";
import { createSignal } from "solid-js";
import Profile from "../Profile/profile";
import { openModal } from "../../utils/modalStore";
import { profileStatus } from "../../utils/authStore";
import { saveAnswer } from "../../utils/trackProgress";

const MultipleChoiceQuestion = (props) => {
  const question = props.question;

  const [formData, setFormData] = createSignal([]);

  const handleChange = (e, setData, data) => {
    const { value, checked } = e.target;

    if (checked) {
      setData([...data(), value]);
    } else {
      setData(data().filter((item) => item !== value));
    }
  };

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

  return (
    <>
      {/* {question.question_type === "multiple_choice" && (
        <>
        </>
      )} */}
      <form onSubmit={handleSubmit}>
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
                    type="checkbox"
                    name="answer"
                    value={item.id}
                    onChange={(e) => handleChange(e, setFormData, formData)}
                    className="checkbox checkbox-md rounded-md cursor-pointer"
                  />
                </label>
              </div>
            </div>
          )}
        </For>

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

export default MultipleChoiceQuestion;
