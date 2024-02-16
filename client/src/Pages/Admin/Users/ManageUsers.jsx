import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersAction,
  updateUserTypeAction,
} from "../../../redux/slices/users/userSlice";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { users, loading, error, isUpdated, isAdmin } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(getAllUsersAction(`/users?email=${email}`));
  }, [dispatch, email, isUpdated]);

  const updateUserType = (userId, newType) => {
    dispatch(updateUserTypeAction({ id: userId, type: newType }));
  };

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center space-x-2">
        <label className="text-gray-700 font-semibold" htmlFor="email">
          Search by Email:
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          className="border rounded-md py-1 px-2 focus:outline-none focus:ring focus:border-indigo-300"
        />
      </div>

      {loading && <LoadingSpinner />}

      {error && <div className="text-red-500">{error}</div>}

      {users && users.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-block capitalize px-4 py-1 text-sm font-semibold rounded-md ${
                      user.type === "admin"
                        ? "bg-red-100 text-red-500"
                        : user.type === "manager"
                        ? "bg-yellow-100 text-yellow-500"
                        : "bg-green-100 text-green-500"
                    }`}
                  >
                    {user.type}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap space-x-3">
                  <select
                    disabled={!isAdmin}
                    value={user.type}
                    onChange={(e) => updateUserType(user._id, e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:ring focus:border-indigo-500"
                  >
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No users found.</div>
      )}
    </div>
  );
};

export default ManageUsers;
