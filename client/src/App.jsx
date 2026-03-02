import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) setAuthUser(username);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* HEADER */}
      <Header
        authUser={authUser}
        setAuthUser={setAuthUser}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <Sidebar sidebarOpen={sidebarOpen} />

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 overflow-y-auto bg-gray-50">
          <Outlet context={{ setAuthUser }} />
        </main>
      </div>
    </div>
  );
}

export default App;
