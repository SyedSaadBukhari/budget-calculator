import React from "react";

import MenuBar from "../MenuBar/MenuBar";
import Title from "../Title/Title";

import "./topbar.scss";

const TopBar = () => {
  return (
    <section className="top-bar">
      <Title />
      <MenuBar />
    </section>
  );
};

export default TopBar;
