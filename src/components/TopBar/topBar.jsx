import React from "react";

import "./topbar.scss";

const TopBar = () => {
  return (
    <article className="top-bar">
      <img src="/images/budgest-tracker-icon.png" alt="Budget Tracker Logo" />
      <h1 className="app-title">Budget Tracker</h1>
    </article>
  );
};

export default TopBar;
