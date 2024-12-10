const LoadingTwo = (props) => {
  return (
    <>
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-full lg:max-w-[750px] mt-4">
            <iframe
              src="https://giphy.com/embed/3etP8HqLPVixUc9Y3s"
              className="giphy-embed w-[280px] lg:w-[480px] h-[248px] lg:h-[348px] mb-4"
              allowFullScreen
            ></iframe>

            <p className="mb-4 text-lg font-semibold">
              Generating your analysis...
            </p>

            <div className="flex items-center justify-center">
              <progress className="progress w-full"></progress>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingTwo;
