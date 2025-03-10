"use client";
import NextTopLoader from "nextjs-toploader";

export default function NextTopLoaderProvider({ children }: any) {
  return (
    <>
      <NextTopLoader
        zIndex={100}
        color="#7ED348"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
      />

      {children}
    </>
  );
}
