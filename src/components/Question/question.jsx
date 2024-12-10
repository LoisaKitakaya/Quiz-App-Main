import OpenEnded from "./openEnded";
import Navbar from "../Navbar/navbar";
import { backend } from "../../utils/secrets";
import { getErrorMessage } from "../../utils/responses";
import { useNavigate, useParams } from "@solidjs/router";
import SingleChoiceQuestion from "./singleChoiceQuestion";
import MultipleChoiceQuestion from "./multipleChoiceQuestion";
import {
  quizState,
  submitAllAnswers,
  updateQuizProgress,
} from "../../utils/trackProgress";
import { createSignal, Match, Switch } from "solid-js";
import Profile from "../Profile/profile";
import { profileStatus } from "../../utils/authStore";
import toast from "solid-toast";
import Cookies from "js-cookie";
import LoadingTwo from "../Loading/loading2";

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

const Question = (props) => {
  const params = useParams();

  const navigate = useNavigate();

  const question = props.question;

  const handleNext = () => {
    const nextIndex = quizState.currentQuestion + 1;

    updateQuizProgress(nextIndex);

    props.refetch();
  };

  const handlePrevious = () => {
    const prevIndex = Math.max(quizState.currentQuestion - 1, 0);

    updateQuizProgress(prevIndex);

    props.refetch();
  };

  const [loading, setLoading] = createSignal(false);

  const getAiAnalysis = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitAllAnswers();

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

  return (
    <>
      <Navbar question={question} handlePrevious={handlePrevious} />

      <div className="hero mt-4">
        <div className="hero-content text-center">
          <Switch>
            <Match when={question.has_next}>
              <div className="max-w-full lg:max-w-[750px]">
                <h1 className="text-2xl font-bold">{question.question}</h1>

                <Switch>
                  <Match when={question.question_type === "multiple_choice"}>
                    <MultipleChoiceQuestion
                      question={question}
                      handleNext={handleNext}
                    />
                  </Match>
                  <Match when={question.question_type === "single_choice"}>
                    <SingleChoiceQuestion
                      question={question}
                      handleNext={handleNext}
                    />
                  </Match>
                  <Match when={question.question_type === "open_ended"}>
                    <OpenEnded question={question} handleNext={handleNext} />
                  </Match>
                </Switch>
              </div>
            </Match>
            <Match when={!question.has_next}>
              <div className="max-w-full lg:max-w-[750px]">
                <Switch>
                  <Match when={profileStatus.status !== "created"}>
                    <h1 className="text-2xl font-bold mb-4">
                      Create a profile for a personalized analysis
                    </h1>

                    <Profile />
                  </Match>
                  <Match when={profileStatus.status === "created"}>
                    <Switch>
                      <Match when={!loading()}>
                        <h1 className="text-2xl font-bold mb-4">
                          Ready to get your analysis?
                        </h1>

                        <form onsubmit={getAiAnalysis}>
                          <button
                            type="submit"
                            className="btn btn-success w-full"
                          >
                            Proceed
                          </button>
                        </form>
                      </Match>
                      <Match when={loading()}>
                        <LoadingTwo />
                      </Match>
                    </Switch>
                  </Match>
                </Switch>
              </div>
            </Match>
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Question;
