import { useEffect, useState } from "react";
import { FaTrash, FaUserPlus } from "react-icons/fa"; // Icons for actions
import Swal from "sweetalert2"; // For confirmation dialogs

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  photo: string;
}

const UserNexus = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle making a user an admin
  const handleMakeAdmin = async (userId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/${userId}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: "admin" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user role");
      }

      // Update the user's role in the local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: "admin" } : user
        )
      );

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Role Updated!",
        text: "The user is now an admin.",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: (err as Error).message,
      });
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (userId: string) => {
    // Confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/users/${userId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete user");
        }

        // Remove the user from the local state
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The user has been deleted.",
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: (err as Error).message,
        });
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center space-x-4">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full">
                        <img
                          src={user.photo || "https://via.placeholder.com/150"}
                          alt={user.name}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.role}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex space-x-2">
                    {/* Make Admin Button */}
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => handleMakeAdmin(user._id)}
                      disabled={user.role === "admin"}
                    >
                      <FaUserPlus className="h-5 w-5 text-blue-600" />
                    </button>

                    {/* Delete User Button */}
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <FaTrash className="h-5 w-5 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserNexus;
