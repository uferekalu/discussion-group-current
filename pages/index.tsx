import React, { useEffect, useMemo, useState } from "react";
import { AppConfig } from "@/utils/AppConfig";
import { Meta } from "@/components/layout/Meta";
import { Section } from "@/components/layout/Section";
import { motion } from "framer-motion";
import { Reusables } from "@/utils/Reusables";
import { Footer } from "@/components/footer";
import RegisterModal from "@/components/auth/register/RegisterModal";
import LoginModal from "@/components/auth/login/Login";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hook";
import { getCookie } from "@/utils/utility";
import Navigation from "@/components/navigation/Navigation";

export default function Home() {
  const auth = useAppSelector((state) => state.auth);
  const token = useMemo(() => getCookie("token"), []);
  const router = useRouter();

  console.log("token", token)
  const {
    handleOpenLoginModal,
    isRegisterModalOpen,
    handleOpenRegisterModal,
    handleCloseRegisterModal,
    isLoginModalOpen,
    handleCloseLoginModal,
  } = Reusables();

  useEffect(() => {
    if (token) {
      router.push("/forum");
    }
  }, [token, router]);
  return (
    <div className="flex flex-col text-gray-600 antialiased">
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Navigation
        handleRegister={handleOpenRegisterModal}
        handleLogin={handleOpenLoginModal}
      />
      <Section
        width="w-full"
        height="min-h-screen"
        otherClassName="flex flex-col mt-10 p-4"
        background='url("/background.jpg")'
      >
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
          style={{
            backgroundImage: 'url("background3.jpg")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backdropFilter: "saturate(180% blur(20px)",
          }}
          className="text-white text-sm font-bold shadow-lg w-52 text-center mx-auto p-2 rounded-lg sm:mt-20 mt-10"
        >
          The Discussion Group App
        </motion.h1>
        <motion.p
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
          style={{
            backgroundImage: 'url("background3.jpg")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "100%",
            backdropFilter: "saturate(180% blur(20px)",
          }}
          className="text-white text-sm text-justify shadow-lg w-full mx-auto p-4 rounded-lg mt-4"
        >
          {`Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.`}
        </motion.p>
      </Section>
      <Footer />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
        handleOpenLoginModal={handleOpenLoginModal}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        handleOpenRegisterModal={handleOpenRegisterModal}
      />
    </div>
  );
}
