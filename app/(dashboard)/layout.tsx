import React from "react";

import Header from "@/components/Header";

type LayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="px:3 lg:px-14">{children}</main>;
    </>
  );
};

export default DashboardLayout;
