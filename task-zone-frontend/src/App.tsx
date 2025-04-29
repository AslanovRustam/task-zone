import { lazy } from "react";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
const Home = lazy(() => import("./pages/Home"));
const Tasks = lazy(() => import("./pages/Tasks"));
const SingleTask = lazy(() => import("./pages/SingleTask"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/:id" element={<SingleTask />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

/* <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:id" element={<SingleTask />} />
      </Route> */
