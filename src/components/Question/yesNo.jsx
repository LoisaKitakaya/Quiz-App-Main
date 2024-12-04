import toast from "solid-toast";
import { createSignal } from "solid-js";
import { backend } from "../../utils/secrets";
import { getErrorMessage } from "../../utils/responses";
import Results from "./results";
import Cookies from "js-cookie";
import { useParams } from "@solidjs/router";
import { openModal } from "../../utils/modalStore";

const submitYesNo = async (data) => {
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

  const url = `${backend}/api/v1/quiz/fetch-quiz-responses`;

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

const YesNo = (props) => {
  const question = props.question;

  const params = useParams();

  const [formData, setFormData] = createSignal(null);

  const [loading, setLoading] = createSignal(false);

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleComplete = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      //   console.log({
      //     selected_option: formData(),
      //     rating: null,
      //     text: null,
      //     choice: null,
      //   });

      const result = await fetchResults({
        username: Cookies.get("username"),
        quiz_id: params.id,
      });

      if (result.status && result.status >= 400) {
        toast.error(result.message);
      } else {
        openModal("Quiz Results", <Results results={result} />);
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
      //   console.log({
      //     selected_option: null,
      //     rating: null,
      //     text: null,
      //     choice: formData() === "yes" ? true : false,
      //   });

      const result = await submitYesNo({
        username: Cookies.get("username"),
        question_id: question.id,
        selected_option: null,
        rating: null,
        text: null,
        choice: formData(),
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
      {question.question_type === "yes_no" && (
        <>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 mt-6"></div>

            <div>
              <label className="form-control w-full flex flex-row justify-start gap-2 cursor-pointer items-center">
                <div className="label">
                  <span>Yes</span>
                </div>
                <input
                  type="radio"
                  name="answer"
                  value="yes"
                  onChange={handleChange}
                />
              </label>
              <label className="form-control w-full flex flex-row justify-start gap-2 cursor-pointer items-center">
                <div className="label">
                  <span>No</span>
                </div>
                <input
                  type="radio"
                  name="answer"
                  value="no"
                  onChange={handleChange}
                />
              </label>
            </div>

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

export default YesNo;
