import { JSX, useState } from "react";

const AdmimDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("Dashboard");

  const pages: Record<string, JSX.Element> = {
    Dashboard: <h2 className="text-xl font-bold">Here is Reuse Component</h2>,
    Profile: <h2 className="text-xl font-bold">Profile Page</h2>,
    Analytics: <h2 className="text-xl font-bold">Analytics Page</h2>,
    Settings: <h2 className="text-xl font-bold">Settings Page</h2>,
    Reports: <h2 className="text-xl font-bold">Reports Page</h2>,
    Users: <h2 className="text-xl font-bold">Users Page</h2>,
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col p-6">
        {/* Button to open sidebar on small screens */}
        <label
          htmlFor="my-drawer"
          className="btn btn-primary drawer-button lg:hidden mb-4"
        >
          Open Sidebar
        </label>

        {/* Dynamic Page Content */}
        <div className="p-6 bg-white shadow-md rounded-lg">
          {pages[selectedPage]}
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li className="font-bold text-lg mb-4">Dashboard Menu</li>
          {Object.keys(pages).map((page) => (
            <li key={page}>
              <a
                className={`p-3 block rounded ${
                  selectedPage === page
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-300"
                }`}
                onClick={() => setSelectedPage(page)}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdmimDashboard;
