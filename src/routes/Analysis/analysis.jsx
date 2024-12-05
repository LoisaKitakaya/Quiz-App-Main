import Cookies from "js-cookie";
import { createResource } from "solid-js";
import { backend } from "../../utils/secrets";
import NotFound from "../../assets/robot-404.png";
import { profileStatus } from "../../utils/authStore";
import Loading from "../../components/Loading/loading";
import AIAnalysis from "../../components/AI/aiAnalysis";
import { getErrorMessage } from "../../utils/responses";
import { useNavigate, useParams } from "@solidjs/router";
import Metadata from "../../components/Metadata/metadata";

const fetchAnalysis = async (id) => {
  const username = Cookies.get("username");

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = `${backend}/api/v1/quiz/fetch-quiz-analysis?quiz_id=${id}&username=${username}`;

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

const Analysis = () => {
  const navigate = useNavigate();

  const params = useParams();

  if (profileStatus.status !== "created") navigate(`/quizzes/${params.id}`);

  const [analysisData] = createResource(params.id, fetchAnalysis);

  return (
    <>
      <Metadata title="AI Analysis" />

      <Suspense fallback={<Loading />}>
        <Switch>
          <Match when={analysisData()}>
            {() => {
              const data = analysisData();

              return (
                <>
                  <AIAnalysis
                    analysis={analysisData()}
                    navigate={navigate}
                    id={params.id}
                  />
                </>
              );
            }}
          </Match>
          <Match when={!analysisData()}>
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

export default Analysis;
