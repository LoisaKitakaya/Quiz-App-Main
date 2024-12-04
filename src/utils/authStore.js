import Cookies from "js-cookie";
import { createStore } from "solid-js/store";

const [authState, setAuthState] = createStore({
  isAuthenticated: !!Cookies.get("session"),
});

const [userStatus, setUserStatus] = createStore({
  status: Cookies.get("role"),
});

const [profileStatus, setProfileStatus] = createStore({
  status: Cookies.get("profile") || null,
  username: Cookies.get("username") || null,
});

const login = (token, role) => {
  setAuthState({ isAuthenticated: true });

  Cookies.set("session", token, { expires: 3 });
  Cookies.set("role", role, { expires: 3 });
};

const logout = () => {
  setAuthState({ isAuthenticated: false });

  Cookies.remove("csrftoken");
  Cookies.remove("session");
  Cookies.remove("role");
  Cookies.remove("sessionid");
};

const createUserProfile = (username) => {
  Cookies.set("profile", "created");
  Cookies.set("username", username);
};

export {
  userStatus,
  authState,
  profileStatus,
  login,
  logout,
  createUserProfile,
};
