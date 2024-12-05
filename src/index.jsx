/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";

import "./index.css";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

import App from "./App";
import Quiz from "./routes/Quizzes/quizzes";
import Analysis from "./routes/Analysis/analysis";

render(
  () => (
    <Router root={App}>
      <Route path="/quizzes">
        <Route path="/:id" component={Quiz} />
        <Route path="/:id/ai-analysis" component={Analysis} />
      </Route>
    </Router>
  ),
  root
);
