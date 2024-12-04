import Cookies from "js-cookie";
import { createStore } from "solid-js/store";

const [quizState, setQuizState] = createStore({
  currentQuestion: Number(Cookies.get("current_question")) || 0,
});


const updateQuizProgress = (step) => {
  setQuizState({
    currentQuestion: step,
  });

  Cookies.set("current_question", step);
};

const resetQuizProgress = () => {
  setQuizState({
    currentQuestion: 0,
  });

  Cookies.remove("current_question");
};

export { quizState, updateQuizProgress, resetQuizProgress };
