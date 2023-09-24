import { useAppSelector } from "@/store/hook";
import React, { useState } from "react";

const Reusables = () => {
  const [mouseResult, setMouseResult] = useState<number | string | null>(null);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  

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

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  return {
    mouseResult,
    toggleMenu,
    handleToggleMenu,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleOpenRegisterModal,
    handleOpenLoginModal,
    isRegisterModalOpen,
    handleCloseRegisterModal,
    handleCloseLoginModal,
    isLoginModalOpen,
  };
};

export { Reusables };
