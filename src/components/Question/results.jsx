const Results = (props) => {
  const groupByQuestionType = (questions) => {
    if (!Array.isArray(questions)) {
      console.error("Expected an array of questions but got:", questions);
      return {};
    }
    return questions.reduce((groups, question) => {
      if (!groups[question.question_type]) {
        groups[question.question_type] = [];
      }
      groups[question.question_type].push(question);
      return groups;
    }, {});
  };

  const groupedQuestions = groupByQuestionType(props.results.questions);

  return (
    <>
      <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
        <h1>{props.results.quiz_title}</h1>
        <div>
          {Object.entries(groupedQuestions).map(([type, questions]) => (
            <div style={{ marginBottom: "20px" }}>
              <div className="divider"></div>
              <h2 style={{ textTransform: "capitalize" }}>
                {type.replace(/_/g, " ")} Questions
              </h2>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {questions.map((question) => (
                  <li
                    style={{
                      background: "#f9f9f9",
                      marginBottom: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <strong>{question.question_text}</strong>
                    <p>
                      <strong>Answer: </strong>
                      {Array.isArray(question.answer)
                        ? question.answer.join(", ")
                        : question.answer?.toString() || "No answer provided"}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="divider"></div>
      </div>

      <a href="#" className="btn btn-success w-full">
        Get AI Analysis
      </a>
    </>
  );
};

export default Results;
