import React from "react";
import { AppConfig } from "@/utils/AppConfig";
import Image from "next/image";
import { useRouter } from "next/router";

interface ILogo {
  size: number
}

const Logo: React.FC<ILogo> = ({ size }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className={`inline-flex items-center text-white space-x-2 sm:text-lg text-sm cursor-pointer`}
    >
      <Image
        id="logo"
        className="rounded-lg"
        src="/discussion.jpg"
        width={size}
        height={size}
        alt="group"
      />
      <div className="sm:block hidden">{AppConfig.site_name}</div>
    </div>
  );
};

export { Logo };
