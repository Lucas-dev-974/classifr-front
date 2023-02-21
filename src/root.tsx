// @refresh reload
import { Suspense } from "solid-js";
import { useLocation, A, Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title } from "solid-start";

import "./root.css";

export default function Root() {
  
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - With TailwindCSS</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Body class="bg-indigo-700">
        <div class="w-full text-center text-xl flex justify-center items-center" style="height: 64px">
          <A href="/" class="text-center text-white tracking-[.20em]">ClassiFR</A>
        </div>

        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>

        <Scripts />
      </Body>

    </Html>
  );
}
