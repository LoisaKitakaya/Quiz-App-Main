const RatingScale = (props) => {
  const question = props.question;

  return (
    <>
      {question.question_type === "rating_scale" && (
        <>
          <div className="mb-4 mt-6"></div>

          <p className="font-semibold italic text-sm mb-4">
            {question.rating_min} for Strongly Disagree - {question.rating_max}{" "}
            for Strongly Agree
          </p>

          <div>
            <input
              type="range"
              min={question.rating_min}
              max={question.rating_max}
              value="1"
              className="range"
              step="1"
            />
            <div className="flex w-full justify-between px-2 text-xs">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>

          <div className="mb-4 mt-6"></div>

          <div className="flex flex-col gap-4 justify-between item-center w-full">
            <Switch>
              <Match when={question.next_index}>
                <button
                  className="btn btn-success w-full"
                  onClick={props.handleNext}
                >
                  Next
                </button>
              </Match>
              <Match when={!question.next_index}>
                <button className="btn btn-success w-full">
                  Complete & Submit
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
        </>
      )}
    </>
  );
};

export default RatingScale;
