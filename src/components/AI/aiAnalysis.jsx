import { mainSite } from "../../utils/secrets";
import { resetQuizProgress } from "../../utils/trackProgress";

const AIAnalysis = (props) => {
  const data = props.analysis;

  const retake = () => {
    resetQuizProgress();

    props.navigate(`/quizzes/${props.id}`);
  };

  return (
    <>
      <div className="py-4 lg:py-8 px-4 lg:px-16">
        <h2 className="text-2xl font-semibold mb-4">AI Analysis</h2>

        <div className="collapse collapse-plus bg-base-200 border shadow-md mb-4">
          <input type="radio" name="my-accordion-3" checked />
          <div className="collapse-title text-xl font-medium">
            Challenge Summary
          </div>
          <div className="collapse-content">
            <p>{data.challenge_summary}</p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200 border shadow-md">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            Professional Feedback
          </div>
          <div className="collapse-content">
            <p>{data.professional_feedback}</p>
          </div>
        </div>

        <div className="divider"></div>

        <h2 className="text-2xl font-semibold mb-4">
          AI Recommended Resources
        </h2>

        <div className="collapse collapse-plus bg-base-200 border shadow-md mb-4">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">Books</div>
          <div className="collapse-content">
            <For each={data.next_steps.resources.books}>
              {(item) => (
                <>
                  <div className="mb-4">
                    <p class="mb-2">Author: {item?.author}</p>
                    <p class="mb-2">Title: {item?.title}</p>
                    <p class="mb-2">Description: {item?.description}</p>
                    <a
                      className="btn btn-sm btn-primary"
                      target="blank"
                      href={item?.url}
                    >
                      View / Buy Book
                    </a>
                  </div>
                </>
              )}
            </For>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200 border shadow-md">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            Blogs & Articles
          </div>
          <div className="collapse-content">
            <For each={data.next_steps.resources.blogs_and_articles}>
              {(item) => (
                <>
                  <div className="mb-4">
                    <p class="mb-2">Author: {item?.author}</p>
                    <p class="mb-2">Title: {item?.title}</p>
                    <p class="mb-2">Description: {item?.description}</p>
                    <a
                      className="btn btn-sm btn-primary"
                      target="blank"
                      href={item?.url}
                    >
                      Read Article
                    </a>
                  </div>
                </>
              )}
            </For>
          </div>
        </div>

        <div className="divider"></div>

        <button className="btn w-full btn-secondary mb-4" onClick={retake}>
          Retake Quiz
        </button>

        <a
          className="btn w-full btn-secondary mb-4"
          href={`${mainSite}/#coach`}
        >
          Talk to a relationship coach
        </a>
      </div>
    </>
  );
};

export default AIAnalysis;
