import toast from "solid-toast";
import { createSignal } from "solid-js";
import { backend } from "../../utils/secrets";
import { getErrorMessage } from "../../utils/responses";
import { createUserProfile, generateRandomName } from "../../utils/authStore";

const createProfile = async (data) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const url = `${backend}/api/v1/users/create-user-profile`;

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

const Profile = () => {
  const [formData, setFormData] = createSignal({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [loading, setLoading] = createSignal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData(), [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await createProfile({
        first_name: formData().firstName,
        last_name: formData().lastName,
        email: formData().email,
        username: generateRandomName(formData().firstName, formData().lastName),
      });

      if (result.status && result.status >= 400) {
        toast.error(result.message);
      } else {
        toast.success("Profile created successfully");

        createUserProfile(result?.username);

        window.location.reload();
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
      <form onSubmit={handleSubmit}>
        <label className="form-control w-full mb-2">
          <div className="label">
            <span className="label-text">First Name</span>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="w-full"
              name="firstName"
              placeholder="e.g. John"
              value={formData().firstName}
              onInput={handleChange}
              required
            />
          </label>
        </label>
        <label className="form-control w-full mb-2">
          <div className="label">
            <span className="label-text">Last Name</span>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="w-full"
              name="lastName"
              placeholder="e.g. Doe"
              value={formData().lastName}
              onInput={handleChange}
              required
            />
          </label>
        </label>
        <label className="form-control w-full mb-4">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="w-full"
              name="email"
              placeholder="e.g. email@example.com"
              value={formData().email}
              onInput={handleChange}
              required
            />
          </label>
        </label>

        <button
          type="submit"
          className="btn btn-success w-full"
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
      </form>
    </>
  );
};

export default Profile;
