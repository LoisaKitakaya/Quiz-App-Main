import toast from "solid-toast";
import { createSignal } from "solid-js";
import { backend } from "../../utils/secrets";
import { siteTitle } from "../../utils/siteInfo";
import { getErrorMessage } from "../../utils/responses";
import Metadata from "../../components/Metadata/metadata";
import ImageTwo from "../../assets/img_2-removebg-preview.png";
import ImageOne from "../../assets/img_1-removebg-preview.png";
import OurPlatform from "../../assets/icons8-platform-100.png";
import OurVision from "../../assets/icons8-real-estate-100.png";
import WhoWeAre from "../../assets/icons8-question-mark-100.png";

const contactUs = async (data) => {
  const options = {
    method: "POST",
    body: JSON.stringify(data),
  };

  const url = `${
    backend || "https://quiz-app-backend.up.railway.app"
  }/api/v1/company/contact-us`;

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

    return res;
  } catch (err) {
    throw new Error("Something went wrong: " + err);
  }
};
const Home = () => {
  const [contactUsData, setContactUsData] = createSignal({
    first_name: "",
    last_name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = createSignal(false);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactUsData({ ...contactUsData(), [name]: value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await contactUs({
        first_name: contactUsData().first_name,
        last_name: contactUsData().last_name,
        email: contactUsData().email,
        message: contactUsData().message,
      });

      if (result.status && result.status >= 400) {
        toast.error(result.message);
      } else {
        toast.success("Message submitted successfully");

        setContactUsData({
          first_name: "",
          last_name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error(
        `An unexpected error occurred: ${error}. Please try again later.`
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Metadata title="Home" />

      <div
        id="coach"
        className="min-h-screen flex flex-col-reverse lg:flex-row justify-between items-center py-4 px-4 lg:px-16"
      >
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <div className="w-5/6 lg:w-2/3 m-auto text-center lg:text-start">
            <h1 className="text-xl italic font-normal mb-4">
              Should You Stay or Should You Go?
            </h1>

            <h1 className="text-2xl font-semibold mb-4">
              Find Clarity About Your Marriage in Just Minutes.
            </h1>

            <p className="text-lg mb-8">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
              temporibus fugiat alias. Asperiores velit autem dolor sed
              nesciunt, corrupti sequi et enim sunt doloribus libero doloremque
              temporibus deserunt consequuntur! Inventore.
            </p>

            <a
              href="#"
              className="btn btn-primary w-full flex justify-between items-center"
            >
              <span>Talk to a relationship coach</span>
              <i class="bi bi-caret-right-fill"></i>
            </a>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <img className="w-full" src={ImageOne} alt="image one" />
        </div>
      </div>

      <div className="divider px-4">
        <span className="font-thin text-gray-400">{siteTitle}</span>
      </div>

      <div
        id="quiz"
        className="min-h-screen flex flex-col lg:flex-row justify-between items-center py-4 px-4 lg:px-16"
      >
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <img className="w-full" src={ImageTwo} alt="image one" />
        </div>

        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <div className="w-5/6 lg:w-2/3 m-auto text-center lg:text-start">
            <h1 className="text-xl italic font-normal mb-4">
              It's Free and Confidential
            </h1>

            <h1 className="text-2xl font-semibold mb-4">
              Take Our AI-Powered Quiz to Gain Insight and Make the Right
              Decision for You.
            </h1>

            <p className="text-lg mb-8">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
              temporibus fugiat alias. Asperiores velit autem dolor sed
              nesciunt, corrupti sequi et enim sunt doloribus libero doloremque
              temporibus deserunt consequuntur! Inventore.
            </p>

            <a
              href="#"
              className="btn btn-primary w-full flex justify-between items-center"
            >
              <span>Take the quiz now</span>
              <i class="bi bi-caret-right-fill"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="divider px-4">
        <span className="font-thin text-gray-400">{siteTitle}</span>
      </div>

      <div id="about" className="p-4">
        <h1 className="text-2xl text-center font-semibold">About Us</h1>

        <div className="flex justify-evenly flex-wrap">
          <div className="card bg-base-100 w-full lg:w-80">
            <div className="card-body">
              <div className="flex justify-center">
                <img
                  className="w-2/3 lg:w-5/6"
                  src={WhoWeAre}
                  alt="who we are"
                />
              </div>
              <h2 className="text-2xl text-center font-bold mb-4">
                Who We Are
              </h2>
              <p className="text-center mb-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
                temporibus fugiat alias. Asperiores velit autem dolor sed
                nesciunt, corrupti sequi et enim sunt doloribus libero
                doloremque temporibus deserunt consequuntur! Inventore.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 w-full lg:w-80">
            <div className="card-body">
              <div className="flex justify-center">
                <img
                  className="w-2/3 lg:w-5/6"
                  src={OurVision}
                  alt="who we are"
                />
              </div>
              <h2 className="text-2xl text-center font-bold mb-4">
                Our Vision
              </h2>
              <p className="text-center mb-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
                temporibus fugiat alias. Asperiores velit autem dolor sed
                nesciunt, corrupti sequi et enim sunt doloribus libero
                doloremque temporibus deserunt consequuntur! Inventore.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 w-full lg:w-80">
            <div className="card-body">
              <div className="flex justify-center">
                <img
                  className="w-2/3 lg:w-5/6"
                  src={OurPlatform}
                  alt="who we are"
                />
              </div>
              <h2 className="text-2xl text-center font-bold mb-4">
                Our Platform
              </h2>
              <p className="text-center mb-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
                temporibus fugiat alias. Asperiores velit autem dolor sed
                nesciunt, corrupti sequi et enim sunt doloribus libero
                doloremque temporibus deserunt consequuntur! Inventore.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="divider px-4">
        <span className="font-thin text-gray-400">{siteTitle}</span>
      </div>

      <div id="faqs" className="py-4 px-4 lg:px-16">
        <h1 className="text-2xl text-center font-semibold mb-8">FAQs</h1>

        <div className="collapse collapse-plus bg-base-200 mb-4">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-medium">
            What is this platform and who is it for?
          </div>
          <div className="collapse-content">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
              temporibus fugiat alias. Asperiores velit autem dolor sed
              nesciunt, corrupti sequi et enim sunt doloribus libero doloremque
              temporibus deserunt consequuntur! Inventore.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200 mb-4">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-medium">
            How does the platform help me manage my properties more efficiently?
          </div>
          <div className="collapse-content">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
              temporibus fugiat alias. Asperiores velit autem dolor sed
              nesciunt, corrupti sequi et enim sunt doloribus libero doloremque
              temporibus deserunt consequuntur! Inventore.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200 mb-4">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-medium">
            Is my data secure on this platform?
          </div>
          <div className="collapse-content">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
              temporibus fugiat alias. Asperiores velit autem dolor sed
              nesciunt, corrupti sequi et enim sunt doloribus libero doloremque
              temporibus deserunt consequuntur! Inventore.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200 mb-4">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-medium">
            How does billing work?
          </div>
          <div className="collapse-content">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
              temporibus fugiat alias. Asperiores velit autem dolor sed
              nesciunt, corrupti sequi et enim sunt doloribus libero doloremque
              temporibus deserunt consequuntur! Inventore.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200 mb-4">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-medium">
            What kind of support can I expect if I have questions or encounter
            issues?
          </div>
          <div className="collapse-content">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
              temporibus fugiat alias. Asperiores velit autem dolor sed
              nesciunt, corrupti sequi et enim sunt doloribus libero doloremque
              temporibus deserunt consequuntur! Inventore.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200 mb-4">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-medium">
            Is there a free trial available, and how can I get started?
          </div>
          <div className="collapse-content">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
              temporibus fugiat alias. Asperiores velit autem dolor sed
              nesciunt, corrupti sequi et enim sunt doloribus libero doloremque
              temporibus deserunt consequuntur! Inventore.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200 mb-4">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title font-medium">
            Can I access the platform on mobile devices?
          </div>
          <div className="collapse-content">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
              temporibus fugiat alias. Asperiores velit autem dolor sed
              nesciunt, corrupti sequi et enim sunt doloribus libero doloremque
              temporibus deserunt consequuntur! Inventore.
            </p>
          </div>
        </div>
      </div>

      <div className="divider px-4">
        <span className="font-thin text-gray-400">{siteTitle}</span>
      </div>

      <div id="contact" className="p-4 mb-4">
        <h1 className="text-2xl text-center font-semibold">Contact Us</h1>

        <div className="card bg-base-100 w-82 lg:w-1/2 mx-auto">
          <div className="card-body">
            <form onSubmit={handleContactSubmit}>
              <div className="flex justify-between items-center gap-4 mb-4">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  className="input input-bordered w-full"
                  value={contactUsData().first_name}
                  onInput={handleContactChange}
                  required
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  className="input input-bordered w-full"
                  value={contactUsData().last_name}
                  onInput={handleContactChange}
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="e.g. user@example.com"
                className="input input-bordered w-full mb-4"
                value={contactUsData().email}
                onInput={handleContactChange}
                required
              />
              <textarea
                name="message"
                className="textarea textarea-bordered h-24 w-full mb-4"
                placeholder="Type your message here"
                value={contactUsData().message}
                onInput={handleContactChange}
                required
              ></textarea>
              <div className="card-actions justify-center">
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={loading()}
                >
                  <Switch>
                    <Match when={!loading()}>
                      <span>Submit</span>
                    </Match>
                    <Match when={loading()}>
                      <span className="loading loading-bars loading-sm"></span>
                    </Match>
                  </Switch>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
