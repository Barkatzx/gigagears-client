import { JSX, useState } from "react";
import { AiFillProduct, AiOutlineDashboard } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { IoBagAddOutline } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { RiFileList2Line } from "react-icons/ri";
import MenuDeshboard from "../../MenuDashboard/MenuDeshboard";
import AddProducts from "../../Products/AddProducts";
import ProductEditDelete from "../../Products/EditDeleteProducts";
import UserNexus from "../../UserNexus/UserNexus";

const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("Dashboard");

  const pages: Record<
    string,
    { label: string; icon: JSX.Element; content: JSX.Element }
  > = {
    Dashboard: {
      label: "Dashboard",
      icon: <AiOutlineDashboard className="text-xl" />,
      content: <MenuDeshboard />,
    },
    AddProduct: {
      label: "Add Product",
      icon: <IoBagAddOutline className="text-xl" />,
      content: <AddProducts />,
    },
    ProductDetails: {
      label: "Inventory Control",
      icon: <AiFillProduct className="text-xl" />,
      content: <ProductEditDelete />,
    },
    ManageUser: {
      label: "User Nexus",
      icon: <MdManageAccounts className="text-xl" />,
      content: <UserNexus />,
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
        <ul className="menu bg-gray-50 font-bold min-h-full w-60 p-4 shadow-2xl">
          <img src="/src/assets/img/logo.png" className="w-40 mx-auto" />
          <li className="font-bold text-center text-lg mb-4">
            Admin Dashboard
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
                onClick={() => {
                  setSelectedPage(key);
                }}
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

export default AdminDashboard;
