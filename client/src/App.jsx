import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setAuthUser(username);
    }
  }, []);

  return (
    <>
      <Header
        authUser={authUser}
        setAuthUser={setAuthUser}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} />
        <div className="flex-1">
          <Outlet context={{ setAuthUser }} />
        </div>
      </div>
    </>
  );
}

export default App;
