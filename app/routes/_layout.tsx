import { Outlet } from "@remix-run/react";
import Navbar from "~/components/Navbar";

function AppLayout() {
  return (
    <>
      <Navbar />
      <section className="mx-auto max-w-7xl px-8">
        <Outlet />
      </section>
    </>
  );
}

export default AppLayout;
