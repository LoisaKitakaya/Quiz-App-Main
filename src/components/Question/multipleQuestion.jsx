import toast from "solid-toast";
import { createSignal } from "solid-js";
import { backend } from "../../utils/secrets";
import { getErrorMessage } from "../../utils/responses";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "@solidjs/router";
import { openModal } from "../../utils/modalStore";
import Results from "./results";

const submitMultipleQuestion = async (data) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const url = `${backend}/api/v1/quiz/submit-answer`;

  try {
    const response = await fetch(url, options);

    const res = await response.json();

    if (response.status >= 400) {
      const message = res?.detail
        ? res?.detail
        : getErrorMessage(response.status);

      return {
        status: response.status,
        message,
      };
    }

    return res;
  } catch (err) {
    throw new Error("Something went wrong: " + err);
  }
};

const fetchResults = async (data) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const url = `${backend}/api/v1/quiz/quiz-ai-analysis`;

  try {
    const response = await fetch(url, options);

    const res = await response.json();

    if (response.status >= 400) {
      const message = res?.detail
        ? res?.detail
        : getErrorMessage(response.status);

      return {
        status: response.status,
        message,
      };
    }

    return res;
  } catch (err) {
    throw new Error("Something went wrong: " + err);
  }
};

const MultipleQuestion = (props) => {
  const question = props.question;

  const params = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = createSignal(null);

  const [loading, setLoading] = createSignal(false);

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleComplete = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await fetchResults({
        username: Cookies.get("username"),
        quiz_id: params.id,
      });

      if (result.status && result.status >= 400) {
        toast.error(result.message);
      } else {
        navigate(`/quizzes/${params.id}/ai-analysis`);
      }
    } catch (error) {
      toast.error(
        `An unexpected error occurred: ${error}. Please try again later.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await submitMultipleQuestion({
        username: Cookies.get("username"),
        question_id: question.id,
        selected_option: formData(),
        rating: null,
        text: null,
        choice: null,
      });

      if (result.status && result.status >= 400) {
        toast.error(result.message);
      } else {
        if (!question.next_index) {
          await handleComplete(e);
        } else {
          props.handleNext();
        }
      }
    } catch (error) {
      toast.error(
        `An unexpected error occurred: ${error}. Please try again later.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {question.question_type === "multiple_choice" && (
        <>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 mt-6"></div>

            <For each={question.options}>
              {(item) => (
                <label className="form-control w-full flex flex-row justify-start gap-2 cursor-pointer items-center">
                  <div className="label">
                    <span>{item.text}</span>
                  </div>
                  <input
                    type="radio"
                    name="answer"
                    value={item.id}
                    onChange={handleChange}
                  />
                </label>
              )}
            </For>

            <div className="mb-4 mt-6"></div>

            <div className="flex flex-col gap-4 justify-between item-center w-full">
              <Switch>
                <Match when={question.next_index}>
                  <button
                    type="submit"
                    disabled={loading()}
                    className="btn btn-success w-full"
                  >
                    <Switch>
                      <Match when={!loading()}>
                        <span>Next</span>
                      </Match>
                      <Match when={loading()}>
                        <span className="loading loading-bars loading-sm"></span>
                      </Match>
                    </Switch>
                  </button>
                </Match>
                <Match when={!question.next_index}>
                  <button
                    type="submit"
                    disabled={loading()}
                    className="btn btn-success w-full"
                  >
                    <Switch>
                      <Match when={!loading()}>
                        <span>Complete & Submit</span>
                      </Match>
                      <Match when={loading()}>
                        <span className="loading loading-bars loading-sm"></span>
                      </Match>
                    </Switch>
                  </button>
                </Match>
              </Switch>
              <Show when={question.previous_index}>
                <button
                  className="btn btn-primary w-full"
                  onClick={props.handlePrevious}
                >
                  Previous
                </button>
              </Show>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default MultipleQuestion;
