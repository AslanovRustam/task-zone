import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const Home = lazy(() => import("./pages/Home"));
const Tasks = lazy(() => import("./pages/Tasks"));
const SingleTask = lazy(() => import("./pages/SingleTask"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PublicRoute />}>
          <Route index element={<Home />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/:id" element={<SingleTask />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
