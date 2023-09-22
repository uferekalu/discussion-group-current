import Head from "next/head";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { AppConfig } from "@/utils/AppConfig";

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
};

const Meta = (props: IMetaProps) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="discussion"
          href={`${router.basePath}/discussion.jpg`}
          key="discussion"
        />
        <link
          rel="icon"
          type="image/jpg"
          sizes="32x32"
          href={`${router.basePath}/discussion1.jpg`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/jpg"
          sizes="32x32"
          href={`${router.basePath}/group.jpg`}
          key="icon32"
        />
        <link
          rel="icon"
          href={`${router.basePath}/favicon.ico`}
          key="favicon"
        />
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          title: props.title,
          description: props.description,
          url: props.canonical,
          locale: AppConfig.locale,
          site_name: AppConfig.site_name,
        }}
      />
    </>
  );
};

export { Meta };
