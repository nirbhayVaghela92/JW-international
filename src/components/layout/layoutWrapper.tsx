"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

//   const isPublicPage = (publicRoutes as readonly string[]).includes(pathname);

  useEffect(() => {
    const handleChunkError = (e: ErrorEvent) => {
      if (e?.message?.includes("Loading chunk")) {
        console.warn("Chunk load error - reloading page");
        // window.location.reload();
      }
    };

    const handlePromiseRejection = (event: PromiseRejectionEvent) => {
      if (
        event?.reason?.message?.includes("Loading chunk") ||
        event?.reason?.toString().includes("ChunkLoadError")
      ) {
        console.warn("Unhandled rejection due to chunk load - reloading");
        // window.location.reload();
      }
    };

    window.addEventListener("error", handleChunkError);
    window.addEventListener("unhandledrejection", handlePromiseRejection);

    return () => {
      window.removeEventListener("error", handleChunkError);
      window.removeEventListener("unhandledrejection", handlePromiseRejection);
    };
  }, []);

  return (
    <>
      {/* <NextTopLoader color="#5750F1" showSpinner={false} /> */}
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          success: {
            style: {
              background: "linear-gradient(90deg, #CDEBDB 0%, #F0F0F0 100%)",
              color: "black",
              fontWeight: "600",
            },
          },
          error: {
            style: {
              background:
                "linear-gradient(90.05deg, #FADCDC 0.04%, #F8EAEA 97.58%)",

              color: "black",
              fontWeight: "600",
            },
          },
        }}
      />
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </>
  );
}
