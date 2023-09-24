import { AppConfig } from "@/utils/AppConfig";

const FooterCopyright = () => (
  <div className="footer-copyright text-white text-xs font-semibold">
    © Copyright {new Date().getFullYear()} {AppConfig.title}. Made by{" "}
    <a href="https://uferekalu.vercel.app/" className="hover:text-yellow-600">
      Ufere Goodnews (Fullstack Developer)
    </a>
    .
    <style jsx>
      {`
        .footer-copyright :global(a) {
          @apply text-primary-500;
        }

        .footer-copyright :global(a:hover) {
          @apply underline;
        }
      `}
    </style>
  </div>
);

export { FooterCopyright };
