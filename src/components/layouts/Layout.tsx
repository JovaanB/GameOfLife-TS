import React, { ReactElement } from "react";
import Header from "./components/Header";
import PageTitle from "./components/PageTitle";

type layoutProps = {
  children: ReactElement;
  title: string;
};

const Layout = ({ children, title }: layoutProps) => {
  return (
    <>
      <Header />
      <div className="container">
        <PageTitle title={title} />
        {children}
      </div>
    </>
  );
};

export default Layout;
