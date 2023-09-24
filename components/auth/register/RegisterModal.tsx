import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { registerUser } from "@/slices/authSlice";
import { motion } from "framer-motion";
import CoolInput from "@/components/input/Input";
import { Button } from "@/components/button/Button";
import { Reusables } from "@/utils/Reusables";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleOpenLoginModal: () => void;
}

const RegisterModal = (props: RegisterModalProps) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    country: "",
    sex: "",
    hobbies: "",
  });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const { handleOpenLoginModal, onClose } = props;

  const { handleOnMouseEnter, handleOnMouseLeave, mouseResult } = Reusables();

  useEffect(() => {
    if (auth.registerStatus === "success") {
      handleOpenLoginModal();
      onClose();
    }
  }, [auth.registerStatus, handleOpenLoginModal, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAlreadyHaveAccount = () => {
    props.onClose();
    setUserData({
      name: "",
      email: "",
      username: "",
      password: "",
      country: "",
      sex: "",
      hobbies: "",
    });
    setTimeout(() => {
      props.handleOpenLoginModal();
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(registerUser(userData));
    setUserData({
      name: "",
      email: "",
      username: "",
      password: "",
      country: "",
      sex: "",
      hobbies: "",
    });
  };
  return (
    <div className={props.isOpen ? "visible" : "invisible"}>
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
                Your Details For Registration
              </motion.h1>
              <div className="flex space-x-2 italic mt-6 text-yellow-200">
                <h4 className="font-medium text-sm">
                  Already have an account?{" "}
                </h4>
                <button
                  onClick={handleAlreadyHaveAccount}
                  className="flex text-sm text-black py-1 px-2 -mt-1 w-30 bg-white w-30 h rounded-lg "
                >
                  Login
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                {auth.registerStatus === "rejected" ? (
                  <p className="flex text-sm text-center bg-white p-2 rounded-lg text-red-500 mt-3 justify-center items-center m-auto mb-3 italic ">
                    {auth.registerError}
                  </p>
                ) : null}

                <CoolInput
                  inputValue={userData.name}
                  name="name"
                  type="text"
                  onChange={handleChange}
                  className="mt-2 w-full p-2 rounded-lg shadow-lg text-sm"
                  placeholder={"Enter your name"}
                />
                <CoolInput
                  inputValue={userData.email}
                  name="email"
                  type="email"
                  onChange={handleChange}
                  className="mt-2 w-full p-2 rounded-lg shadow-lg text-sm"
                  placeholder={"Enter your email"}
                />
                <CoolInput
                  inputValue={userData.username}
                  name="username"
                  type="text"
                  onChange={handleChange}
                  className="mt-2 w-full p-2 rounded-lg shadow-lg text-sm"
                  placeholder={"Enter your username"}
                />
                <CoolInput
                  inputValue={userData.password}
                  name="password"
                  type="password"
                  onChange={handleChange}
                  className="mt-2 w-full p-2 rounded-lg shadow-lg text-sm"
                  placeholder={"Enter your password"}
                />
                <CoolInput
                  inputValue={userData.country}
                  name="country"
                  type="text"
                  onChange={handleChange}
                  className="mt-2 w-full p-2 rounded-lg shadow-lg text-sm"
                  placeholder={"Enter your country"}
                />
                <CoolInput
                  inputValue={userData.hobbies}
                  name="hobbies"
                  type="text"
                  onChange={handleChange}
                  className="mt-2 w-full p-2 rounded-lg shadow-lg text-sm"
                  placeholder={"Enter your hobbies"}
                />
                <CoolInput
                  inputValue={userData.sex}
                  name="sex"
                  type="text"
                  onChange={handleChange}
                  className="mt-2 w-full p-2 rounded-lg shadow-lg text-sm"
                  placeholder={"Enter your sex"}
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
                    disabled={auth.registerStatus === "pending"}
                    type="submit"
                    text={
                      auth.registerStatus === "pending"
                        ? "Submitting..."
                        : "Register"
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

export default RegisterModal;
