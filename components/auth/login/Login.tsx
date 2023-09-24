import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { login } from "@/slices/authSlice";
import { motion } from "framer-motion";
import CoolInput from "@/components/input/Input";
import { Button } from "@/components/button/Button";
import { Reusables } from "@/utils/Reusables";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleOpenRegisterModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  handleOpenRegisterModal,
}) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { handleOnMouseEnter, handleOnMouseLeave, mouseResult } = Reusables();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (auth.loginStatus === "success") {
      onClose();
      router.push("/forum");
    }
  }, [auth.loginStatus, router, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDontHaveAccount = () => {
    onClose();
    setUserData({
      email: "",
      password: "",
    });
    setTimeout(() => {
      handleOpenRegisterModal();
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login(userData));
    setUserData({
      email: "",
      password: "",
    });
  };
  return (
    <div className={isOpen ? "visible" : "invisible"}>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
      {/* Modal */}
      <div className="fixed p-4 inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            backgroundImage: 'url("/background2.jpg")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className="relative sm:max-w-sm mx-auto my-6 rounded-lg"
        >
          <div className="modal-content rounded-lg shadow-lg p-3">
            <div className="px-4 py-1">
              <motion.h1
                initial={{
                  opacity: 0,
                  y: -20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                }}
                className="text-white text-sm font-bold shadow-lg w-52 text-center mx-auto p-2 rounded-lg"
              >
                Your Details For Login
              </motion.h1>
              <div className="flex space-x-2 italic mt-6 text-yellow-200">
                <h4 className="font-medium text-sm">
                  {"Don't have an account?"}
                </h4>
                <button
                  onClick={handleDontHaveAccount}
                  className="flex text-sm text-black py-1 px-2 -mt-1 w-30 bg-white w-30 h rounded-lg "
                >
                  Register
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                {auth.loginStatus === "rejected" ? (
                  <p className="flex text-sm text-center bg-white p-2 rounded-lg text-red-500 mt-3 justify-center items-center m-auto mb-3 italic ">
                    {auth.loginError}
                  </p>
                ) : null}
                <CoolInput
                  inputValue={userData.email}
                  name="email"
                  type="email"
                  onChange={handleChange}
                  className="mt-2 w-full p-2 rounded-lg shadow-lg text-sm"
                  placeholder={"Enter your email"}
                />
                <CoolInput
                  inputValue={userData.password}
                  name="password"
                  type="password"
                  onChange={handleChange}
                  className="mt-2 w-full p-2 rounded-lg shadow-lg text-sm"
                  placeholder={"Enter your password"}
                />
                <div className="flex justify-between mt-3">
                  <Button
                    type="button"
                    text="Close"
                    onClick={onClose}
                    handleOnMouseEnter={() => handleOnMouseEnter("Close")}
                    handleOnMouseLeave={handleOnMouseLeave}
                    mouseResult={mouseResult}
                    extrClass="w-24"
                    background="bg-red-500"
                  />
                  <Button
                    disabled={auth.loginStatus === "pending"}
                    type="submit"
                    text={
                      auth.loginStatus === "pending" ? "Submitting..." : "Login"
                    }
                    onClick={() => {}}
                    handleOnMouseEnter={() => handleOnMouseEnter("Close")}
                    handleOnMouseLeave={handleOnMouseLeave}
                    mouseResult={mouseResult}
                    extrClass="w-24"
                    background="bg-teal-500"
                  />
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginModal;
