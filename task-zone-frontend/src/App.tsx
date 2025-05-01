import { lazy } from "react";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
const Home = lazy(() => import("./pages/Home"));
const Tasks = lazy(() => import("./pages/Tasks"));
const SingleTask = lazy(() => import("./pages/SingleTask"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignInPage = lazy(() => import("./pages/SigninPage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PublicRoute />}>
          <Route index element={<Home />} />
          <Route path="auth/login" element={<LoginPage />} />
          <Route path="auth/signup" element={<SignInPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/:id" element={<SingleTask />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
