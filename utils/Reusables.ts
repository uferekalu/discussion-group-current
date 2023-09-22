import React, { useState } from "react";

const Reusables = () => {
  const [mouseResult, setMouseResult] = useState<number | string | null>(null);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  const handleToggleMenu = () => {
    setToggleMenu((prevState) => !prevState);
    // setShowNotification(false)
  };

  const handleOnMouseEnter = (data: string) => {
    setMouseResult(data);
  };

  const handleOnMouseLeave = () => {
    setMouseResult(null);
  };
  
  function getCookie(name: string) {
    const cookies = document.cookie.split(",").map((cookie) => cookie.trim());
    const desiredCookie = cookies.find((cookie) =>
      cookie.startsWith(name + "=")
    );
    if (desiredCookie) {
      return desiredCookie.substring(name.length + 1);
    }
    return null;
  }

  return {
    getCookie,
    mouseResult,
    toggleMenu,
    handleToggleMenu,
    handleOnMouseEnter,
    handleOnMouseLeave,
  };
};

export { Reusables };
