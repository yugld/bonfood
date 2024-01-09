import Breadcrumbs from "@init-src/components/Breadcrumb";
import PageTitle from "@init-src/components/page/PageTitle";
import PageWrapper from "@init-src/components/page/PageWrapper";
import { cn } from "@init-src/utils/cn";
import { ReactNode } from "react";

function PageContent({
  children,
  sectionName,
  className,
  title,
  breadcrumb,
}: {
  title?: string | false;
  breadcrumb?: false;
  className?: string;
  sectionName?: string;
  children?: ReactNode | ReactNode[];
}) {
  return (
    <section className={cn(sectionName, className)}>
      <div
        className={cn(
          "container mx-auto lg:w-4/5 3xl:w-2/3",
          "px-5 lg:px-0",
          "",
        )}
      >
        {title !== false && <PageTitle title={title} />}
        {breadcrumb !== false && <Breadcrumbs />}
        <PageWrapper>{children}</PageWrapper>
      </div>
    </section>
  );
}

export default PageContent;
