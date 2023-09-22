import React from "react";
import { Button } from "../button/Button";

interface IUnAuthenticated {
  onClick: () => void;
  handleOnMouseEnter: (text: string) => void;
  handleOnMouseLeave: () => void;
  mouseResult: number | string | null;
}

const UnAuthenticated: React.FC<IUnAuthenticated> = ({
  onClick,
  handleOnMouseEnter,
  handleOnMouseLeave,
  mouseResult,
}) => {
  return (
    <>
      <Button
        text="Sign Up"
        onClick={onClick}
        handleOnMouseEnter={() => handleOnMouseEnter("Sign Up")}
        handleOnMouseLeave={handleOnMouseLeave}
        mouseResult={mouseResult}
        extrClass="w-24"
        background="bg-blue-500"
      />
      <Button
        text="Login"
        onClick={onClick}
        handleOnMouseEnter={() => handleOnMouseEnter("Login")}
        handleOnMouseLeave={handleOnMouseLeave}
        mouseResult={mouseResult}
        extrClass="w-24"
        background="bg-teal-500"
      />
    </>
  );
};

export default UnAuthenticated
