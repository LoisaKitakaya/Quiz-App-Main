import { useParams } from "@solidjs/router";
import { backend } from "../../utils/secrets";
import NotFound from "../../assets/robot-404.png";
import { quizState } from "../../utils/trackProgress";
import { profileStatus } from "../../utils/authStore";
import Profile from "../../components/Profile/profile";
import Loading from "../../components/Loading/loading";
import { getErrorMessage } from "../../utils/responses";
import { createEffect, createResource } from "solid-js";
import Metadata from "../../components/Metadata/metadata";
import Question from "../../components/Question/question";

const fetchQuestion = async ({ id, index }) => {
  if (index === null || index === undefined) {
    throw new Error("Invalid question index");
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = `${backend}/api/v1/quiz/questions/${id}?question_index=${index}`;

  try {
    const response = await fetch(url, options);

    const res = await response.json();

    if (response.status >= 400) {
      return {
        status: response.status,
        message: res?.detail ? res?.detail : getErrorMessage(response.status),
      };
    }

    return res;
  } catch (err) {
    throw new Error("Something went wrong: " + err);
  }
};

const Quiz = () => {
  if (profileStatus.status !== "created") return <Profile />;

  const params = useParams();

  const currentParams = () => ({
    id: params.id,
    index: quizState.currentQuestion ?? 0,
  });

  const [quizData, { refetch }] = createResource(currentParams, fetchQuestion);

  //   createEffect(() => {
  //     console.log("Fetching with params:", currentParams());
  //     console.log("Quiz data:", quizData());
  //   });

  return (
    <>
      <Metadata title="Quiz" />

      <Suspense fallback={<Loading />}>
        <Switch>
          <Match when={quizData()}>
            {() => {
              const data = quizData();

              return (
                <>
                  <Question refetch={refetch} question={data} />
                </>
              );
            }}
          </Match>
          <Match when={!quizData()}>
            <div className="flex justify-center items-center pt-20">
              <div className="text-center">
                <img src={NotFound} alt="404" className="w-1/2 m-auto" />
                <p className="text-2xl font-semibold">Could not fetch data</p>
              </div>
            </div>
          </Match>
        </Switch>
      </Suspense>
    </>
  );
};

export default Quiz;
