import React from "react";
import Header from "./common/header";
import Sidebar from "./common/sidebar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="d-flex">
        <Sidebar />
        <div style={{width: "87%"}}>
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
