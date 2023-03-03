// <Show when fallback => ne fonctionne pas comme il le devrait

// @refresh reload
import { createSignal, For, onMount, Suspense, Show, Switch, Match } from "solid-js";
import { useLocation, A, Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title } from "solid-start";
import authenticationCheck from "./components/authenticationCheck";
import {render} from 'solid-js/web';
import "./root.css";
// import 'tw-elements';

import {user, setUser} from "./store/signaux";
import Notification from "./components/notification";

import { notifs, pushNotif } from "./store/signaux";


function logout(){
  localStorage.removeItem('Authorization');
  window.location.href = '/';
}

export default function Root() {
   const [location, setLocation] = createSignal("http://127.0.0.1:3000/login") // valeur par default pour que l'affichage ne se fasse pas par default
  //  const [connectionStatus, setConnectionStatus] = createSignal(authenticationCheck()); // statut de connexion
  onMount(() => {
    // pushNotif({message: "test dynamique", color:"blue"})
    setLocation(window.location.href); // enregistrement de la page actuelle
    
    function afficherLoginButton() {
      const connexion = authenticationCheck()

      return <>
        <Switch>
          <Match when={connexion} > <button onclick={logout}>se déco</button> </Match>
          <Match when={!connexion && location() != "http://127.0.0.1:3000/login"}>
            <button onClick={ ()=> window.location.href = "/login"}>S'authentifier</button>
          </Match>
        </Switch>
      </>
    }
    render(afficherLoginButton, document.getElementById('loginButton') as HTMLDivElement);
  })
  // utiliser un fallback !
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - With TailwindCSS</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Body class="bg-[#2b2a66]">
        <div class="w-full text-center text-xl flex justify-center items-center" style="height: 64px">
          <a href="/" class="text-center text-white tracking-[.20em]">ClassiFR</a>
          <div id="loginButton"></div>
          {/* <Switch>
            <Match when={connectionStatus()==true} > <button onclick={logout}>se déco</button> </Match>
            <Match when={!connectionStatus() && location() != "http://127.0.0.1:3000/login"}>
              <button onClick={ ()=> window.location.href = "/login"}>S'authentifier</button>
            </Match>
          </Switch> */}
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

        <script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js"></script>
        
      </Body>

    </Html>
  );
}
