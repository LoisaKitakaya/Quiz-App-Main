const MultipleQuestion = (props) => {
  const question = props.question;

  return (
    <>
      {question.question_type === "multiple_choice" && (
        <>
          <div className="mb-4 mt-6"></div>

          <For each={question.options}>
            {(item) => (
              <label className="form-control w-full flex flex-row justify-start gap-2 cursor-pointer items-center">
                <div className="label">
                  <span>{item.text}</span>
                </div>
                <input type="radio" name="answer" value={item.id} />
              </label>
            )}
          </For>

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

export default MultipleQuestion;
