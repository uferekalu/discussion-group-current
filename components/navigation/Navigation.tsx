import React, { useEffect, useMemo, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Logo } from "../logo/Logo";
import { Button } from "../button/Button";
import { Reusables } from "@/utils/Reusables";
import { Section } from "../layout/Section";
import { getCookie, setCookie } from "@/utils/utility";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hook";

interface INavigation {
  handleRegister: () => void;
  handleLogin: () => void;
}

const Navigation: React.FC<INavigation> = ({ handleRegister, handleLogin }) => {
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useMemo(() => getCookie("token"), []);
  const controls = useAnimation();

  const {
    mouseResult,
    toggleMenu,
    handleToggleMenu,
    handleOnMouseEnter,
    handleOnMouseLeave,
  } = Reusables();

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

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
    // router.push("/");
  };

  return (
    <motion.nav
      initial={{ opacity: 1 }}
      animate={controls}
      className={`fixed top-0 left-0 w-full shadow-lg transition-all ease-in-out duration-300 ${
        scrolling ? "py-2" : "py-4"
      }`}
      style={{
        backgroundImage: 'url("background2.jpg")',
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
          <div className="text-white text-sm bg-black rounded-lg p-2 shadow-lg">
            Welcome Lushak
          </div>
          <div className="sm:flex hidden space-x-3">
            {!isLoggedIn && (
              <>
                <Button
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
                <Button
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
              </>
            )}
            {isLoggedIn && (
              <Button
                text="Logout"
                onClick={() => handleLogout()}
                handleOnMouseEnter={() => handleOnMouseEnter("Logout")}
                handleOnMouseLeave={handleOnMouseLeave}
                mouseResult={mouseResult}
                extrClass="w-24"
                background="bg-blue-500"
              />
            )}
          </div>
          <div className="sm:hidden flex -mr-12">
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
                      scrolling ? "-mt-4" : undefined
                    }`}
                    background='url("/background4.jpeg")'
                  >
                    <div className="flex space-x-3">
                      {!isLoggedIn && (
                        <>
                          <Button
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
                          <Button
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
                        </>
                      )}
                      {isLoggedIn && (
                        <Button
                          text="Logout"
                          onClick={() => handleLogout()}
                          handleOnMouseEnter={() =>
                            handleOnMouseEnter("Logout")
                          }
                          handleOnMouseLeave={handleOnMouseLeave}
                          mouseResult={mouseResult}
                          extrClass="w-24"
                          background="bg-blue-500"
                        />
                      )}
                    </div>
                  </Section>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
