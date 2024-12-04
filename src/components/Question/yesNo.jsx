const YesNo = (props) => {
  const question = props.question;

  return (
    <>
      {question.question_type === "yes_no" && (
        <>
          <div className="mb-4 mt-6"></div>

          <div>
            <label className="form-control w-full flex flex-row justify-start gap-2 cursor-pointer items-center">
              <div className="label">
                <span>Yes</span>
              </div>
              <input type="radio" name="answer" value="yes" />
            </label>
            <label className="form-control w-full flex flex-row justify-start gap-2 cursor-pointer items-center">
              <div className="label">
                <span>No</span>
              </div>
              <input type="radio" name="answer" value="no" />
            </label>
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
            <Show
              when={
                (question.previous_index !== null &&
                  question.previous_index !== undefined) ||
                question.previous_index >= 0
              }
            >
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

export default YesNo;
