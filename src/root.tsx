// @refresh reload
import { createSignal, For, onMount, Suspense } from "solid-js";
import { useLocation, A, Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title } from "solid-start";

import "./root.css";

import {user, setUser} from "./store/signaux";
import Notification from "./components/notification";
import { notifs, pushNotif } from "./store/signaux";

export default function Root() {
  onMount(() => {
    // pushNotif({message: "test dynamique", color:"blue"})
  })
  
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - With TailwindCSS</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Body class="bg-[#2b2a66]">
        <div class="w-full text-center text-xl flex justify-center items-center" style="height: 64px">
          <A href="/" class="text-center text-white tracking-[.20em]">ClassiFR</A>
        </div>

        <For each={notifs()}>{(notif, i) => 
          <Notification notif={notif} class=""/>
        }</For>

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
