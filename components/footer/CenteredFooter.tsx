import type { ReactNode } from "react";
import { FooterIconList } from "./FooterIconList";
import { FooterCopyright } from "./FooterCopyright";
import Link from "next/link";

type ICenteredFooterProps = {
  logo: ReactNode;
  iconList: ReactNode;
  children: ReactNode;
};

const CenteredFooter = (props: ICenteredFooterProps) => (
  <div className="text-center">
    <Link href={"/"}>{props.logo}</Link>

    <nav>
      <ul className="navbar mt-5 flex flex-row justify-center text-xl font-medium text-gray-800">
        {props.children}
      </ul>
    </nav>

    <div className="mt-8 flex justify-center">
      <FooterIconList>{props.iconList}</FooterIconList>
    </div>

    <div className="mt-8 text-sm">
      <FooterCopyright />
    </div>

    <style jsx>
      {`
        .navbar :global(li) {
          @apply mx-4;
        }
      `}
    </style>
  </div>
);

export { CenteredFooter };
