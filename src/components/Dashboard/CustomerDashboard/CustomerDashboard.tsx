import { JSX, useState } from "react";
import { AiOutlineDashboard, AiOutlineSetting } from "react-icons/ai";
import { FiBarChart, FiUsers } from "react-icons/fi";
import { IoBagAddOutline } from "react-icons/io5";
import { RiFileList2Line } from "react-icons/ri";

const CustomerDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("Dashboard");

  const pages: Record<
    string,
    { label: string; icon: JSX.Element; content: JSX.Element }
  > = {
    Dashboard: {
      label: "Dashboard",
      icon: <AiOutlineDashboard className="text-xl" />,
      content: <h2 className="text-xl font-bold">Customer DashBoard</h2>,
    },
    AddProduct: {
      label: "Add Product",
      icon: <IoBagAddOutline className="text-xl" />,
      content: <h2 className="text-xl font-bold">New Menu</h2>,
    },
    Analytics: {
      label: "Analytics",
      icon: <FiBarChart className="text-xl" />,
      content: <h2 className="text-xl font-bold">Analytics Page</h2>,
    },
    Settings: {
      label: "Settings",
      icon: <AiOutlineSetting className="text-xl" />,
      content: <h2 className="text-xl font-bold">Settings Page</h2>,
    },
    Reports: {
      label: "Reports",
      icon: <RiFileList2Line className="text-xl" />,
      content: <h2 className="text-xl font-bold">Reports Page</h2>,
    },
    Users: {
      label: "Users",
      icon: <FiUsers className="text-xl" />,
      content: <h2 className="text-xl font-bold">Users Page</h2>,
    },
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col p-6">
        <label
          htmlFor="my-drawer"
          className="btn btn-primary drawer-button lg:hidden mb-4"
        >
          Open Sidebar
        </label>

        {/* Dynamic Page Content */}
        <div className="p-6 bg-white shadow-md rounded-lg">
          {pages[selectedPage].content}
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu bg-gray-100 font-bold min-h-full w-70 p-4">
          <img src="/src/assets/img/logo.png" className="w-50 mx-auto" />
          <li className="font-bold text-center text-lg mb-4">
            Customer Dashboard
          </li>
          <hr className="text-gray-400" />
          {Object.entries(pages).map(([key, page]) => (
            <li key={key}>
              <a
                className={`flex items-center gap-3 p-3 rounded ${
                  selectedPage === key
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setSelectedPage(key)}
              >
                {page.icon}
                {page.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerDashboard;
