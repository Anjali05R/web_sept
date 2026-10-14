
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({onLogout}) {
  return (
    <div className="d-flex flex-column min-vh-100">
       <Navbar onLogout={onLogout} />

      <main className="container flex-grow-1 py-5">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

