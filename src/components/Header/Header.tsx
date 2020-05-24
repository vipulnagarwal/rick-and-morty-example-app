import React from "react";
import scss from "./Header.module.scss";
export const Header: React.FC = () => {
  return (
    <>
      <div className={scss.header}>Rick and Morty Show</div>
    </>
  );
};
