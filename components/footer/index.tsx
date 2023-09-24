import Link from "next/link";

import { Section } from "../layout/Section";
import { CenteredFooter } from "./CenteredFooter";
import { Logo } from "../logo/Logo";

const Footer = () => (
  <Section
    width="w-full"
    height="h-3/4"
    otherClassName="p-5"
    background='url("/background3.jpg")'
  >
    <CenteredFooter
      logo={<Logo size={44} />}
      iconList={
        <>
          <Link href="https://twitter.com/lushak_tech">
            <i className="bi bi-twitter text-white font-semibold text-xl ease-in duration-300 hover:text-2xl"></i>
          </Link>
          <Link href="https://www.linkedin.com/in/kalu-ufere-a5b0787a/">
            <i className="bi bi-linkedin text-white font-semibold text-xl ease-in duration-300 hover:text-2xl"></i>
          </Link>
        </>
      }
    >
      <li>
        <Link href="https://github.com/uferekalu">
          <i className="bi bi-github text-white font-semibold text-xl ease-in duration-300 hover:text-2xl"></i>
        </Link>
      </li>
    </CenteredFooter>
  </Section>
);

export { Footer };
