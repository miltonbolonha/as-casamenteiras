import React from "react";

const BodyBlock = ({ children, opt }) => {
  return (
    <div
      className={opt.classes}
      style={{ background: `url(${opt.bgImg}) repeat` }}
    >
      {children}
    </div>
  );
};

export default BodyBlock;
