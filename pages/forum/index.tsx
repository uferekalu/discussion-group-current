import { NextPage } from "next";
import { AppConfig } from "@/utils/AppConfig";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Meta } from "@/components/layout/Meta";
import jwtDecode from "jwt-decode";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useRouter } from "next/router";
import { Reusables } from "@/utils/Reusables";
import { getCookie, parseTokenExpiration, setCookie } from "@/utils/utility";
import { logoutUser } from "@/slices/authSlice";
import { DecodedJWT } from "@/utils/interface";
import { Section } from "@/components/layout/Section";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { allGroups } from "@/slices/groupSlice";
import PulseAnimations from "@/components/animations/PulseAnimations";
import GroupCard from "@/components/group/GroupCard";
import Navigation from "@/components/navigation/Navigation";

const Forum: NextPage = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState<DecodedJWT>();
  const token = useMemo(() => getCookie("token"), []);
  const tokenExpiration = useMemo(
    () => (token ? parseTokenExpiration(token) : ""),
    [token]
  );

  const groups = useAppSelector((state) => state.groups);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    handleOpenRegisterModal,
    handleOpenLoginModal,
  } = Reusables();

  useEffect(() => {
    dispatch(allGroups());
  }, [dispatch]);

  useEffect(() => {
    if (tokenExpiration === null) {
      setCookie("token", "", { expires: "Thu, 01, Jan 1970 00:00:00 GMT" });
      router.push("/");
    }
    if (!token) {
      router.push("/");
    }
    if (token) {
      const decodedUser: DecodedJWT = jwtDecode(token);
      setAuthenticatedUser(decodedUser);
    }
  }, [dispatch, router, tokenExpiration, token]);

  return (
    <div className="flex flex-col text-gray-600 antialiased">
      <Meta
        title={`${AppConfig.title} | Forum`}
        description={AppConfig.description}
      />
      <Navigation handleRegister={handleOpenRegisterModal} handleLogin={handleOpenLoginModal} />
      <Section
        width="w-full"
        height="min-h-screen"
        otherClassName="flex flex-col mt-10 p-4"
        background='url("/background.jpg")'
      >
        <div className="hidden sm:flex mt-0 w-full space-x-3">
          <motion.div
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
            className="flex flex-col w-1/4 py-6"
          >
            {groups.groupStatus === "pending" && (
              <PulseAnimations num={3} display="grid grid-cols-1 gap-4" />
            )}
            {groups.groupStatus === "rejected" && (
              <div className="text-black text-sm">
                Not Available at the moment. Please refresh the page...
              </div>
            )}
            {groups.groupStatus === "success" && (
              <GroupCard
                allGroups={groups.allGroups}
                authenticatedUser={authenticatedUser}
              />
            )}
          </motion.div>
          <motion.div
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
            className="flex flex-col w-3/4 px-4 py-6 mt-8"
          >
            the forum the forum the forum the forum the forum the forum the
            forum the forum the forum the forum the forum the forum
          </motion.div>
        </div>
        <div className="flex flex-col itens-center justify-center sm:hidden space-y-2 w-full"></div>
      </Section>
      <Footer />
    </div>
  );
};

export default Forum;
