import React, { useState } from "react";
import { AppConfig } from "@/utils/AppConfig";
import { Button } from "@/components/button/Button";
import { Meta } from "@/components/layout/Meta";
import { Section } from "@/components/layout/Section";
import { Logo } from "@/components/logo/Logo";
import Navbar from "@/components/navigation/Navbar";
import { motion } from "framer-motion";
import UnAuthenticated from "@/components/unAuthenticated/UnAuthenticated";
import NavMobile from "@/components/navigation/NavMobile";
import { Reusables } from "@/utils/Reusables";
import ReusableTitle from "@/components/reusableTitle/ReusableTitle";

export default function Home() {
  const {
    mouseResult,
    toggleMenu,
    handleToggleMenu,
    handleOnMouseEnter,
    handleOnMouseLeave,
  } = Reusables();

  return (
    <div className="flex flex-coltext-gray-600 antialiased">
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Navbar logo={<Logo size={44} />} greetings="Welcome Lushak">
        <div className="sm:flex hidden justify-between space-x-3">
          <UnAuthenticated
            handleOnMouseEnter={handleOnMouseEnter}
            handleOnMouseLeave={handleOnMouseLeave}
            mouseResult={mouseResult}
            onClick={() => {}}
          />
        </div>
        <div className="flex sm:hidden">
          <NavMobile
            handleToggleMenu={handleToggleMenu}
            toggleMenu={toggleMenu}
            handleOnMouseEnter={handleOnMouseEnter}
            handleOnMouseLeave={handleOnMouseLeave}
            mouseResult={mouseResult}
          />
        </div>
      </Navbar>
      <Section
        width="w-full"
        height="min-h-screen"
        otherClassName="mt-10 p-2"
        background='url("/background.jpg")'
      >
        <div className="flex justify-center items-center mt-20 p-2 rounded-lg shadow-lg text-black">
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
          >
            The Discussion Group App
          </motion.h1>
        </div>
      </Section>
    </div>
  );
}
