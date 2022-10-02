import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Login from "../components/Login";
import EisenHower from "../components/EisenHower";
import { useState, useEffect } from "react";

const Home: NextPage = () => {
  const [apiKey, setApiKey] = useState("");
  const [user, setUser] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  const [data, setData] = useState({
    _do: [],
    deligate: [],
    _delete: [],
    schedule: [],
  });

  function getCookies(): [string, string] {
    let map = new Map();
    let cookie = document.cookie;
    cookie = cookie.replaceAll(";", "");
    let cookies = cookie.split(" ");
    cookies
      .map((cookie) => cookie.split("="))
      .forEach(([key, value]) => map.set(key, value));
    let api = map.get("api");
    let user = map.get("user");
    return [api, user];
  }

  useEffect(() => {
    if (isLoggedIn) return;
    let [api, user] = getCookies();
    console.log("index.tsx");
    setApiKey(api);
    setUser(user);
    if (!isLoggedIn && api && user) {
      setLoggedIn(true);
    }
  }, [isLoggedIn, apiKey]);

  return (
    <div>
      <Head>
        <title>EisenHower</title>
        <meta name="description" content="Habitica EisenHower Matrix" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {isLoggedIn ? (
          <EisenHower apiKey={apiKey} user={user}></EisenHower>
        ) : (
          <Login
            setLoggedIn={setLoggedIn}
            setApiKey={setApiKey}
            setUser={setUser}
          ></Login>
        )}
      </main>
    </div>
  );
};

export default Home;
