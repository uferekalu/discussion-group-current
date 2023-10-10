import { useAppSelector } from "@/store/hook";
import React, { useState } from "react";

const Reusables = () => {
  const [mouseResult, setMouseResult] = useState<number | string | null>(null);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [hoverButton, setHoverButton] = useState<string | number | null>(null);
  const [createAGroup, setCreateAGroup] = useState<boolean>(false);
  const [createGroupNotification, setCreateGroupNotification] =
    useState<boolean>(false);

  const [discussionModal, setDiscussionModal] = useState(false);
  const [discussionGroupId, setDiscussionGroupId] = useState<number | null>(
    null
  );
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const handleCreateGroupNotification = () => {
    setCreateGroupNotification(true);
  };

  const handleCreateAGroup = () => {
    setCreateAGroup(true);
  };
  const handleToggleMenu = () => {
    setToggleMenu((prevState) => !prevState);
    setShowNotification(false)
  };

  const handleOnMouseEnter = (data: string) => {
    setMouseResult(data);
  };

  const handleNotificationOutsideClick = (
    notificationRef: React.RefObject<HTMLDivElement>,
    setShowNotification: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const handleOutsideNotificationClick = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotification(false);
      }
    };
    document.addEventListener("click", handleOutsideNotificationClick);
    return () => {
      document.removeEventListener("click", handleOutsideNotificationClick);
    };
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

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
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
    buttonVariants,
    hoverButton,
    setHoverButton,
    setToggleMenu,
    createAGroup,
    setCreateAGroup,
    handleCreateAGroup,
    createGroupNotification,
    setCreateGroupNotification,
    handleCreateGroupNotification,
    discussionModal,
    setDiscussionModal,
    discussionGroupId,
    setDiscussionGroupId,
    handleNotificationOutsideClick,
    showNotification,
setShowNotification
  };
};

export { Reusables };
