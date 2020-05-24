import React from "react";
import scss from "./Loader.module.scss";
export const Loader = () => {
  return (
    <div className={scss.loader}>
      <i className={`fa fa-spinner fa-4x ${scss.faSpinnerRotate}`} />
    </div>
  );
};
