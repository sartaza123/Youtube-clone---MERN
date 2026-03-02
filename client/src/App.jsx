import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";

function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setAuthUser(username);
    }
  }, []);

  return (
    <>
      <Header authUser={authUser} setAuthUser={setAuthUser} />
      <Outlet context={{ setAuthUser }} />
    </>
  );
}

export default App;
