import Script from "next/script";

export const GoogleAnalytics = () => {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        onLoad={() => {
          //@ts-ignore
          window.dataLayer = window.dataLayer || [];

          function gtag() {
            // @ts-ignore
            // eslint-disable-next-line
            dataLayer.push(arguments);
          }

          //@ts-ignore
          gtag('js', new Date());

          //@ts-ignore
          gtag('config', GA_TRACKING_ID);
        }}
      />
    </>
  );
};
