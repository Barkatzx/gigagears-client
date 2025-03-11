import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

const AdminRoute = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-1/3 bg-blue-900 text-white p-6">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <ul>
            <li className="p-2 rounded cursor-pointer hover:bg-blue-700">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="p-2 rounded cursor-pointer hover:bg-blue-700">
              <Link to="/analytics">Analytics</Link>
            </li>
            <li className="p-2 rounded cursor-pointer hover:bg-blue-700">
              <Link to="/settings">Settings</Link>
            </li>
            <li className="p-2 rounded cursor-pointer hover:bg-blue-700">
              <Link to="/reports">Reports</Link>
            </li>
            <li className="p-2 rounded cursor-pointer hover:bg-blue-700">
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-6">
          <Routes>
            <Route path="/profile" element={<h2>Profile Page</h2>} />
            <Route path="/analytics" element={<h2>Analytics Page</h2>} />
            <Route path="/settings" element={<h2>Settings Page</h2>} />
            <Route path="/reports" element={<h2>Reports Page</h2>} />
            <Route path="/users" element={<h2>Users Page</h2>} />
            <Route path="*" element={<h2>Welcome to Dashboard</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AdminRoute;
