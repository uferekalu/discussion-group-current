import React, { useState, useEffect, ReactNode } from "react";
import { motion, useAnimation } from "framer-motion";

interface INavbar {
  logo: ReactNode;
  children: ReactNode;
  greetings?: string;
  user?: boolean;
}

const Navbar: React.FC<INavbar> = ({ logo, children, greetings, user }) => {
  const [scrolling, setScrolling] = useState<boolean>(false);
  const controls = useAnimation();

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    controls.start({ opacity: scrolling ? 1 : 1 });
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolling, controls]);

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
          <div>{logo}</div>
          <div className="text-white text-sm bg-black rounded-lg p-2 shadow-lg">
            {greetings}
          </div>
          {children}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
