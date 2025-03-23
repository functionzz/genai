import { Link, useLocation, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";

const Layout = () => {
  const location = useLocation();

  // Navigation items
  const navItems = [
    { id: "chat", label: "Chat", path: "/chat" },
    // { id: "analysis", label: "Saved Analysis", path: "/analysis"},
    { id: "storage", label: "Storage", path: "/storage" },
    { id: "uploads", label: "Uploads", path: "/uploads" },
    { id: "profile", label: "Profile", path: "/profile"}
  ];

  // Helper to check if a path is active
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isActive = (path: any) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Logo Header */}
      <div className="h-16 border-b flex justify-end items-center p-4">
        <img src={logo} className="w-14 h-14"/>
        {/* <div className="bg-amber-500 rounded-full px-4 py-2 flex items-center justify-center">
          <span className="font-bold text-black">GuruUp</span>
        </div> */}
      </div>
      
      <div className="flex flex-1 bg-white overflow-hidden">
        {/* Navigation Sidebar */}
        <div className="w-50 border-r border-gray-200 overflow-y-auto">
          <div className="flex flex-col">
            {navItems.map((item) => (
              <Link key={item.id} to={item.path} className="no-underline">
                <div
                  className={`p-4 border-b cursor-pointer ${
                    isActive(item.path)
                      ? "bg-amber-500 text-black"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;