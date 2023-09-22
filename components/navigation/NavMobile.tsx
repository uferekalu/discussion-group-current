import React from "react";
import { motion } from "framer-motion";
import { Section } from "../layout/Section";
import UnAuthenticated from "../unAuthenticated/UnAuthenticated";

interface INavMobile {
  handleToggleMenu: () => void;
  toggleMenu: boolean;
  handleOnMouseEnter: (data: string) => void;
  handleOnMouseLeave: () => void;
  mouseResult: string | number | null;
}

const NavMobile: React.FC<INavMobile> = ({
  handleToggleMenu,
  toggleMenu,
  handleOnMouseEnter,
  handleOnMouseLeave,
  mouseResult,
}) => {
  return (
    <>
      <i
        onClick={handleToggleMenu}
        className={
          toggleMenu
            ? "bi bi-x-circle-fill font-bold text-white text-2xl ease-in duration-300"
            : "bi bi-list text-2xl text-white font-bold ease-in duration-300"
        }
      ></i>
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
              otherClassName="p-3"
              background='url("/background4.jpeg")'
            >
              <div className="flex flex-col space-y-3 w-full">
                <div className="flex space-x-2">
                  <UnAuthenticated
                    handleOnMouseEnter={handleOnMouseEnter}
                    handleOnMouseLeave={handleOnMouseLeave}
                    mouseResult={mouseResult}
                    onClick={() => {}}
                  />
                </div>
              </div>
            </Section>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default NavMobile;
