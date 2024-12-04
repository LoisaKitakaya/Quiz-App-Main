const OpenEnded = (props) => {
  const question = props.question;

  return (
    <>
      {question.question_type === "open_ended" && (
        <>
          <div className="mb-4 mt-6"></div>

          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Your answer here"
          ></textarea>

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

export default OpenEnded;
