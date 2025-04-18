import { Suspense } from "react";
import { Outlet } from "react-router";
import { Loader } from "./Loader/Loader";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <ToastContainer />
    </div>
  );
}
