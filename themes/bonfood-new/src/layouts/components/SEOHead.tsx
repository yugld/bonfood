import { ROUTE_TRANSITION_ENDED_EVENT } from "@init-src/events";
import { useSeoProps } from "@init-src/hooks/useSeoProps";
import useUpdate from "@init-src/hooks/useUpdate";
import eventBus from "@init-src/libs/EventBus";
import Head from "@ssr-client/Head";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function SEOHead() {
  const seo = useSeoProps();
  const update = useUpdate();

  useEffect(() => {
    eventBus.on(ROUTE_TRANSITION_ENDED_EVENT, () => {
      update();
    });
    return () => {
      eventBus.detach(ROUTE_TRANSITION_ENDED_EVENT, () => update());
    };
  }, [update]);

  const { t } = useTranslation("breadcrumbs");

  return (
    <Head>
      <title>{t(seo.title)}</title>
      {seo.description ? (
        <meta name="description" content={seo.description} />
      ) : null}
    </Head>
  );
}

export default SEOHead;
