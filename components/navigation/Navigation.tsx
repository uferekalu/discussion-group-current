import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { motion, useAnimation } from "framer-motion";
import { Logo } from "../logo/Logo";
import { Reusables } from "@/utils/Reusables";
import { Section } from "../layout/Section";
import { getCookie, setCookie } from "@/utils/utility";
import {
  AllGroupsObject,
  AllNotifications,
  DecodedJWT,
  UserObject,
} from "@/utils/interface";
import NavButton from "./NavButton";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { allGroups } from "@/slices/groupSlice";
import PulseAnimations from "../animations/PulseAnimations";
import GroupsUserCanJoinAndBelongsTo from "../group/GroupsUserCanJoinAndBelongsTo";
import ReusableModal from "../modal/ReusableModal";
import InviteUserToJoinGroup from "../group/InviteUserToJoinGroup";
import { RootState } from "@/store";
import { Notifications } from "../notifications/Notifications";

interface INavigation {
  handleRegister: () => void;
  handleLogin: () => void;
  authenticatedUser: DecodedJWT | undefined;
  handleIsLoggedOut: () => void;
  groupStatus: string;
  groupsToJoin: string[] | unknown;
  belongsTo?: string[] | unknown;
  openModal: () => void | undefined;
  selectGroup: (id: number, name: string) => void;
  handleGroupsUserBelongsTo: () => void;
  handleJoinAGroup: () => void;
  handleCreateAGroup: () => void;
  isJoinAGroup: boolean;
  isBelongTo: boolean;
  handleGroupsUsersCreated: () => void;
  groupsUserCreated: string[] | unknown;
  users: UserObject[];
  groups: AllGroupsObject[];
  showSendInviteGroup: boolean;
  notifications: AllNotifications[];
  notificationStatus: string;
  notificationError: string;
}

const Navigation: React.FC<INavigation> = ({
  handleRegister,
  handleLogin,
  authenticatedUser,
  handleIsLoggedOut,
  groupStatus,
  groupsToJoin,
  belongsTo,
  openModal,
  selectGroup,
  handleGroupsUserBelongsTo,
  handleJoinAGroup,
  handleCreateAGroup,
  isJoinAGroup,
  isBelongTo,
  handleGroupsUsersCreated,
  groupsUserCreated,
  users,
  groups,
  showSendInviteGroup,
  notifications,
  notificationStatus,
  notificationError,
}) => {
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [sendInvite, setSendInvite] = useState<boolean>(false);
  const token = useMemo(() => getCookie("token"), []);
  const menuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const controls = useAnimation();
  const {
    mouseResult,
    toggleMenu,
    handleToggleMenu,
    handleOnMouseEnter,
    handleOnMouseLeave,
    setToggleMenu,
    handleNotificationOutsideClick,
    showNotification,
    setShowNotification,
  } = Reusables();

  const handleOpenSendInvite = () => {
    setSendInvite(true);
  };

  const handleCloseSendInvite = () => {
    setSendInvite(false);
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    handleNotificationOutsideClick(notificationRef, setShowNotification);
  }, [handleNotificationOutsideClick, setShowNotification]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowNotification((prevState) => !prevState);
    setToggleMenu(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setToggleMenu(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [setToggleMenu]);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  useEffect(() => {
    controls.start({ opacity: scrolling ? 1 : 1 });
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolling, controls]);

  const handleLogout = () => {
    setCookie("token", "", { expires: "Thu, 01, Jan 1970 00:00:00 GMT" });
    handleIsLoggedOut();
  };

  return (
    <motion.nav
      initial={{ opacity: 1 }}
      animate={controls}
      className={`fixed top-0 left-0 w-full shadow-lg transition-all ease-in-out duration-300 ${
        scrolling ? "py-2" : "py-4"
      }`}
      style={{
        backgroundImage: 'url("/background2.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        backdropFilter: "saturate(180% blur(20px)",
      }}
    >
      <div className="container px-4">
        <div className="flex justify-between">
          <div>
            <Logo size={44} />
          </div>
          {!isLoggedIn && (
            <>
              <div></div>
              <div></div>
              <div></div>
            </>
          )}
          {isLoggedIn && authenticatedUser && (
            <div className="text-white text-sm bg-black rounded-lg p-2 shadow-lg sm:ml-auto">
              Welcome{" "}
              {authenticatedUser?.username.slice(0, 1).toUpperCase() +
                authenticatedUser?.username.slice(1)}
            </div>
          )}
          <div className="sm:flex hidden space-x-3 ml-auto">
            {!isLoggedIn && (
              <div className="flex space-x-3">
                <NavButton
                  text="Sign Up"
                  onClick={() => {
                    handleRegister();
                  }}
                  handleOnMouseEnter={() => handleOnMouseEnter("Sign Up")}
                  handleOnMouseLeave={handleOnMouseLeave}
                  mouseResult={mouseResult}
                  extrClass="w-24"
                  background="bg-blue-500"
                />
                <NavButton
                  text="Login"
                  onClick={() => {
                    handleLogin();
                  }}
                  handleOnMouseEnter={() => handleOnMouseEnter("Login")}
                  handleOnMouseLeave={handleOnMouseLeave}
                  mouseResult={mouseResult}
                  extrClass="w-24"
                  background="bg-teal-500"
                />
              </div>
            )}
            {isLoggedIn && (
              <div className="flex space-x-3">
                {showSendInviteGroup && (
                  <>
                    {notifications && (
                      <div
                        className="flex mr-1 mt-1 cursor-pointer"
                        onClick={handleClick}
                      >
                        <li className="bi bi-bell-fill text-white text-xl mt-1 mr-1 list-none"></li>
                        <span className="flex w-4 h-4 -mt-1 p-3 -ml-2 justify-center items-center text-xs m-auto bg-red-700 rounded-full text-white">
                          {notifications.length}
                        </span>
                      </div>
                    )}
                    <Notifications
                      showNotification={showNotification}
                      notifications={notifications}
                      notificationStatus={notificationStatus}
                      notificationError={notificationError}
                    />
                    <NavButton
                      text="Send an Invite"
                      onClick={() => {
                        handleOpenSendInvite();
                        handleGroupsUsersCreated();
                      }}
                      handleOnMouseEnter={() =>
                        handleOnMouseEnter("Send an Invite")
                      }
                      handleOnMouseLeave={handleOnMouseLeave}
                      mouseResult={mouseResult}
                      extrClass=""
                      background="bg-teal-500"
                    />
                    <NavButton
                      text="Create a Group"
                      onClick={() => handleCreateAGroup()}
                      handleOnMouseEnter={() =>
                        handleOnMouseEnter("Create a Group")
                      }
                      handleOnMouseLeave={handleOnMouseLeave}
                      mouseResult={mouseResult}
                      extrClass=""
                      background="bg-indigo-500"
                    />
                  </>
                )}
                <NavButton
                  text="Logout"
                  onClick={() => handleLogout()}
                  handleOnMouseEnter={() => handleOnMouseEnter("Logout")}
                  handleOnMouseLeave={handleOnMouseLeave}
                  mouseResult={mouseResult}
                  extrClass=""
                  background="bg-blue-500"
                />
              </div>
            )}
          </div>
          <div ref={menuRef}>
            <div className="sm:hidden flex space-x-2">
              {isLoggedIn && notifications && (
                <div onClick={handleClick} className="flex mr-1 mt-1">
                  <li className="bi bi-bell-fill text-white text-xl mt-1 mr-1 list-none"></li>
                  <span className="flex w-4 h-4 -mt-1 p-3 -ml-2 justify-center items-center text-xs m-auto bg-red-700 rounded-full text-white">
                    {notifications.length}
                  </span>
                </div>
              )}
              <Notifications
                showNotification={showNotification}
                notifications={notifications}
                notificationStatus={notificationStatus}
                notificationError={notificationError}
              />
              <i
                onClick={handleToggleMenu}
                className={
                  toggleMenu
                    ? "bi bi-x-circle-fill font-bold text-white text-2xl ease-in duration-300"
                    : "bi bi-list text-2xl text-white font-bold ease-in duration-300"
                }
              ></i>
            </div>
            <div className="sm:hidden flex space-x-3">
              {toggleMenu && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    id="togglebar"
                    className="absolute z-50 top-20 -mt-1 sm:w-1/2 w-5/6 sm:right-6 right-0 rounded-lg shadow-lg"
                  >
                    <Section
                      width="w-full"
                      height="h-24"
                      otherClassName={`p-3 flex flex-col ${
                        isLoggedIn && "h-96 overflow-y-auto"
                      } ${scrolling ? "-mt-4" : undefined}`}
                      background='url("/background4.jpeg")'
                    >
                      <div className="flex space-x-3">
                        {!isLoggedIn && (
                          <div className="grid grid-cols-2 gap-2">
                            <NavButton
                              text="Sign Up"
                              onClick={() => {
                                handleRegister();
                                handleToggleMenu();
                              }}
                              handleOnMouseEnter={() =>
                                handleOnMouseEnter("Sign Up")
                              }
                              handleOnMouseLeave={handleOnMouseLeave}
                              mouseResult={mouseResult}
                              extrClass="w-24"
                              background="bg-blue-500"
                            />
                            <NavButton
                              text="Login"
                              onClick={() => {
                                handleLogin();
                                handleToggleMenu();
                              }}
                              handleOnMouseEnter={() =>
                                handleOnMouseEnter("Login")
                              }
                              handleOnMouseLeave={handleOnMouseLeave}
                              mouseResult={mouseResult}
                              extrClass="w-24"
                              background="bg-teal-500"
                            />
                          </div>
                        )}
                        {isLoggedIn && (
                          <div className="flex flex-col space-y-3">
                            <div className="grid grid-cols-3 gap-2">
                              <NavButton
                                text="Send an Invite"
                                onClick={() => {
                                  handleOpenSendInvite();
                                  handleGroupsUsersCreated();
                                  handleToggleMenu();
                                }}
                                handleOnMouseEnter={() =>
                                  handleOnMouseEnter("Send an Invite")
                                }
                                handleOnMouseLeave={handleOnMouseLeave}
                                mouseResult={mouseResult}
                                extrClass=""
                                background="bg-teal-500"
                              />
                              <NavButton
                                text="Create a Group"
                                onClick={() => {
                                  handleCreateAGroup();
                                  handleToggleMenu();
                                }}
                                handleOnMouseEnter={() =>
                                  handleOnMouseEnter("Create a Group")
                                }
                                handleOnMouseLeave={handleOnMouseLeave}
                                mouseResult={mouseResult}
                                extrClass=""
                                background="bg-indigo-500"
                              />
                              <NavButton
                                text="Logout"
                                onClick={() => handleLogout()}
                                handleOnMouseEnter={() =>
                                  handleOnMouseEnter("Logout")
                                }
                                handleOnMouseLeave={handleOnMouseLeave}
                                mouseResult={mouseResult}
                                extrClass=""
                                background="bg-blue-500"
                              />
                            </div>
                            <hr className="text-white" />
                            {groupStatus === "pending" && (
                              <PulseAnimations
                                num={12}
                                display="grid sm:grid-cols-3 gap-4"
                              />
                            )}
                            {groupStatus === "success" && (
                              <GroupsUserCanJoinAndBelongsTo
                                groupsToJoin={groupsToJoin}
                                openModal={openModal}
                                selectGroup={selectGroup}
                                handleGroupsUserBelongsTo={
                                  handleGroupsUserBelongsTo
                                }
                                handleJoinAGroup={handleJoinAGroup}
                                belongsTo={belongsTo}
                                isJoinAGroup={isJoinAGroup}
                                isBelongTo={isBelongTo}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </Section>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ReusableModal
        open={sendInvite}
        onClose={handleCloseSendInvite}
        deSelectGroup={() => {}}
      >
        <InviteUserToJoinGroup
          groupsUserCreated={groupsUserCreated}
          users={users}
          groups={groups}
        />
      </ReusableModal>
    </motion.nav>
  );
};

export default Navigation;
