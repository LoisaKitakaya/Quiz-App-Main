import MultipleQuestion from "./multipleQuestion";
import RatingScale from "./ratingScale";
import OpenEnded from "./openEnded";
import YesNo from "./yesNo";
import { quizState, updateQuizProgress } from "../../utils/trackProgress";

const Question = (props) => {
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


  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-full lg:max-w-[750px]">
            <h1 className="text-5xl font-bold">{question.text}</h1>

            <MultipleQuestion
              question={question}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
            <RatingScale
              question={question}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
            <OpenEnded
              question={question}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
            <YesNo
              question={question}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;
