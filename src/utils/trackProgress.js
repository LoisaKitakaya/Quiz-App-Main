import Cookies from "js-cookie";
import { backend } from "./secrets";
import { createStore } from "solid-js/store";
import { getErrorMessage } from "./responses";
import toast from "solid-toast";

const [quizState, setQuizState] = createStore({
  currentQuestion: Number(Cookies.get("current_question")) || 0,
});

const initialAnswers = Cookies.get("user_progress")
  ? JSON.parse(Cookies.get("user_progress"))
  : [];

const [answersStore, setAnswersStore] = createStore({
  userProgress: initialAnswers,
});

const updateCookies = () => {
  Cookies.set("user_progress", JSON.stringify(answersStore.userProgress));
};

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

  setAnswersStore({
    userProgress: [],
  });

  Cookies.remove("current_question");
  Cookies.remove("user_progress");
};

const saveAnswer = (answer) => {
  setAnswersStore((currentState) => {
    const existingIndex = currentState.userProgress.findIndex(
      (item) => item.question_id === answer.question_id
    );

    if (existingIndex !== -1) {
      return {
        userProgress: currentState.userProgress.map((item, index) =>
          index === existingIndex ? { ...item, ...answer } : item
        ),
      };
    } else {
      return {
        userProgress: [...currentState.userProgress, answer],
      };
    }
  });

  updateCookies();
};

const updateUsername = (username) => {
  setAnswersStore((currentState) => ({
    userProgress: currentState.userProgress.map((answer) =>
      !answer.username || answer.username === ""
        ? { ...answer, username }
        : answer
    ),
  }));

  updateCookies();
};

const submitAllAnswers = async () => {
  updateUsername(Cookies.get("username"));

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answersStore.userProgress),
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

    // resetQuizProgress();

    return res;
  } catch (err) {
    throw new Error("Something went wrong: " + err);
  }
};

export {
  quizState,
  updateQuizProgress,
  resetQuizProgress,
  saveAnswer,
  submitAllAnswers,
};
