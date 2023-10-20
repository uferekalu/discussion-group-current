import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { AllNotifications } from "@/utils/interface";
import PulseAnimation from "../animations/PulseAnimations";
import { Reusables } from "@/utils/Reusables";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store";
import ReusableModal from "../modal/ReusableModal";
import ConfirmDeleteNotification from "./ConfirmDeleteNotification";
import { deleteNotification } from "@/slices/deleteNotificationSlice";
import { getAllNotifications } from "@/slices/groupSlice";

interface INotification {
  showNotification: boolean;
  notifications: AllNotifications[];
  notificationStatus: string;
  notificationError: string;
}

const Notifications: React.FC<INotification> = ({
  showNotification,
  notifications,
  notificationStatus,
  notificationError,
}) => {
  const [inbox, setInbox] = useState<boolean>(false);
  const [unread, setUnread] = useState<boolean>(false);
  const [read, setRead] = useState<boolean>(false);
  const [notificationId, setNotificationId] = useState<number | null>(null);
  const [confirmDeleteNotification, setConfirmDeleteNotification] =
    useState<boolean>(false);
  const [deleteNotificationReady, setDeleteNotificationReady] = useState(false);

  const dispatch = useAppDispatch();
  const deleteNt = useAppSelector(
    (state: RootState) => state.deleteNotification
  );

  const { buttonVariants, setHoverButton, hoverButton } = Reusables();

  useEffect(() => {
    const handleDelete = async () => {
      if (deleteNotificationReady && notificationId !== null) {
        const data = {
          id: notificationId,
        };
        await dispatch(deleteNotification(data));
        await dispatch(getAllNotifications());
      }
    };
    handleDelete();
  }, [deleteNotificationReady, dispatch, notificationId]);

  const handleInbox = () => {
    setInbox(true);
    setUnread(false);
    setRead(false);
  };

  const handleRead = () => {
    setRead(true);
    setInbox(false);
    setUnread(false);
  };

  const handleUnread = () => {
    setUnread(true);
    setInbox(false);
    setRead(false);
  };

  const unreadMsg = () => {
    const unread = notifications.filter(
      (notification) => notification.status === "unread"
    );
    return unread.length;
  };
  const readMsg = () => {
    const read = notifications.filter(
      (notification) => notification.status === "read"
    );
    return read.length;
  };

  useEffect(() => {
    if (unread) {
      setRead(false);
      setInbox(false);
    } else if (read) {
      setUnread(false);
      setInbox(false);
    } else {
      setInbox(true);
      setUnread(false);
      setRead(false);
    }
  }, [read, unread]);

  const handleReadNotification = (text: string) => {
    const result =
      notifications &&
      notifications
        .filter((notification) => notification.status === "read")
        .map((result) => (
          <div className="flex flex-col" key={result.id}>
            <div className="flex flex-col space-y-2 p-1 mt-2">
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  onClick={() => handleNotificationId(result.id)}
                />
                <span className="text-black text-xs">
                  {text === "has reacted" || text === "has started a discussion"
                    ? result.content
                    : result.message}
                </span>
              </div>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                onClick={handleDeleteNotification}
                onMouseEnter={() => setHoverButton("Delete")}
                onMouseLeave={() => setHoverButton(null)}
                className={`bg-blue-500 p-2 rounded-lg shadow-lg text-white text-xs ${
                  hoverButton === "Delete" ? "hover:bg-pink-500" : ""
                }`}
              >
                {"Delete"}
              </motion.button>
            </div>
            <hr />
          </div>
        ));

    return notificationStatus === "pending" ? (
      <div className="mt-2">
        <PulseAnimation num={2} display="grid grid-cols-1 gap-4" />
      </div>
    ) : (
      result
    );
  };

  const handleUnreadNotification = (text: string) => {
    const result =
      notifications &&
      notifications
        .filter((notification) => notification.status === "unread")
        .map((result) => (
          <div className="flex flex-col" key={result.id}>
            <div className="flex flex-col space-y-2 p-1 mt-2">
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  onClick={() => handleNotificationId(result.id)}
                />
                <span className="text-black text-xs">
                  {text === "has reacted" || text === "has started a discussion"
                    ? result.content
                    : result.message}
                </span>
              </div>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                onClick={handleDeleteNotification}
                onMouseEnter={() => setHoverButton("Delete")}
                onMouseLeave={() => setHoverButton(null)}
                className={`bg-blue-500 p-2 rounded-lg shadow-lg text-white text-xs ${
                  hoverButton === "Delete" ? "hover:bg-pink-500" : ""
                }`}
              >
                {"Delete"}
              </motion.button>
            </div>
            <hr />
          </div>
        ));

    return notificationStatus === "pending" ? (
      <div className="mt-2">
        <PulseAnimation num={2} display="grid grid-cols-1 gap-4" />
      </div>
    ) : (
      result
    );
  };

  const handleVariousNotification = (text: string) => {
    const result =
      notifications &&
      notifications
        .filter((notification) => notification.content.includes(text))
        .map((result) => (
          <div className="flex flex-col" key={result.id}>
            <div className="flex flex-col space-y-2 p-1 mt-2">
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  onClick={() => handleNotificationId(result.id)}
                />
                <span className="text-black text-xs">
                  {text === "has reacted" || text === "has started a discussion"
                    ? result.content
                    : result.message}
                </span>
              </div>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                onClick={handleDeleteNotification}
                onMouseEnter={() => setHoverButton("Delete")}
                onMouseLeave={() => setHoverButton(null)}
                className={`bg-blue-500 p-2 rounded-lg shadow-lg text-white text-xs ${
                  hoverButton === "Delete" ? "hover:bg-pink-500" : ""
                }`}
              >
                {"Delete"}
              </motion.button>
            </div>
            <hr />
          </div>
        ));

    return notificationStatus === "pending" ? (
      <div className="mt-2">
        <PulseAnimation num={2} display="grid grid-cols-1 gap-4" />
      </div>
    ) : (
      result
    );
  };

  const handleNotificationId = (id: number) => {
    setNotificationId((prevState) => {
      if (prevState === id) {
        prevState = null;
      } else {
        prevState = id;
      }
      return prevState;
    });
  };

  const handleDeleteNotification = useCallback(() => {
    if (notificationId) {
      setConfirmDeleteNotification(true);
    } else {
      setConfirmDeleteNotification(false);
    }
  }, [notificationId]);
  return (
    <>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute z-50 top-16 mt-3 sm:w-1/2 w-full sm:right-6 right-0 bg-white p-3 rounded-lg shadow-lg">
            <div className="flex space-x-1">
              <h2 className="text-black text-sm font-bold p-2 m-auto justify-center items-center">
                All Notifications
              </h2>
            </div>
            <div className="flex space-x-3">
              <div
                onClick={handleInbox}
                className={`flex space-x-1 mt-1 cursor-pointer ${
                  inbox && "px-2 -mt-1 bg-gray-200 rounded-lg"
                }`}
              >
                <i className="bi bi-envelope"></i>
                <span className="text-xs text-black mt-1">Inbox</span>
              </div>
              <div
                onClick={handleUnread}
                className={`flex space-x-1 mt-1 cursor-pointer ${
                  unread && "px-2 -mt-1 bg-gray-200 rounded-lg"
                }`}
              >
                <span className="flex p-1 justify-center items-center text-xs m-auto bg-gray-500 rounded-full text-white">
                  {unreadMsg()}
                </span>
                <span className="text-xs text-black mt-1 -ml-1">Unread</span>
              </div>
              <div
                onClick={handleRead}
                className={`flex space-x-1 mt-1 cursor-pointer ${
                  read && "px-2 -mt-1 bg-gray-200 rounded-lg"
                }`}
              >
                <span className="flex p-1 justify-center items-center text-xs m-auto bg-gray-500 rounded-full text-white">
                  {readMsg()}
                </span>
                <span className="text-xs text-black mt-1 -ml-1">Read</span>
              </div>
            </div>
            <div className="h-64 overflow-y-auto mt-2">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <h3 className="text-black text-xs text-center font-bold sm:p-2 p-1 mt-2 bg-gray-300 rounded-lg">
                    Group Related:
                  </h3>
                  {inbox && handleVariousNotification("has reacted")}
                  {read && handleReadNotification("has reacted")}
                  {unread && handleUnreadNotification("has reacted")}
                  <hr />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-black text-xs text-center font-bold sm:p-2 p-1 mt-2 bg-gray-300 rounded-lg">
                    Discussions Related:
                  </h3>
                  {inbox &&
                    handleVariousNotification("has started a discussion")}
                  {read && handleReadNotification("has started a discussion")}
                  {unread &&
                    handleUnreadNotification("has started a discussion")}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-black text-xs text-center font-bold sm:p-2 p-1 mt-2 bg-gray-300 rounded-lg">
                    Invite Related:
                  </h3>
                  {inbox &&
                    handleVariousNotification(
                      "You have an invitation waiting for your action"
                    )}
                  {read &&
                    handleReadNotification(
                      "You have an invitation waiting for your action"
                    )}
                  {unread &&
                    handleUnreadNotification(
                      "You have an invitation waiting for your action"
                    )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      <ReusableModal
        open={confirmDeleteNotification}
        onClose={() => setConfirmDeleteNotification(false)}
        deSelectGroup={() => {}}
        background="bg-slate-300"
      >
        <ConfirmDeleteNotification
          handleConfirm={() => setDeleteNotificationReady(true)}
          handleCancel={() => setConfirmDeleteNotification(false)}
          deleteState={deleteNt}
        />
      </ReusableModal>
    </>
  );
};

export { Notifications };
