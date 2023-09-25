import React from "react";
import { Button } from "../button/Button";

interface IAuthenticatd {
  handleOnMouseEnter: () => void;
  handleOnMouseLeave: () => void;
  mouseResult: string | number | null;
  onClick: () => void;
  text: string;
  extrClass: string;
  background: string;
}

const NavButton: React.FC<IAuthenticatd> = ({
  handleOnMouseEnter,
  handleOnMouseLeave,
  mouseResult,
  onClick,
  text,
  extrClass,
  background,
}) => {
  return (
    <Button
      text={text}
      onClick={onClick}
      handleOnMouseEnter={handleOnMouseEnter}
      handleOnMouseLeave={handleOnMouseLeave}
      mouseResult={mouseResult}
      extrClass={extrClass}
      background={background}
    />
  );
};

export default NavButton;
