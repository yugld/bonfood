import PageContent from "@init-src/components/page/PageContent";
import Head from "@ssr-client/Head";
import { usePage } from "@ssr-client/usePage";

function Page() {
  const page = usePage();
  const title = page.props?.title as string;
  const content = page.props?.content as string;
  console.log(page.meta);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <PageContent title={title}>{content}</PageContent>
    </>
  );
}

export default Page;
