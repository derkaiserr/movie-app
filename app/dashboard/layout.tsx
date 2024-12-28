"use client";

import React from "react";
import Nav from "@/components/Nav";
import Sidebar from "@/components/sidebar";
import { Provider } from "react-redux";
import { store } from "../store";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <div className="antialiased relative ">
        <Nav />
        {/* <Sidebar /> */}
        {children}
      </div>
    </Provider>
  );
}
