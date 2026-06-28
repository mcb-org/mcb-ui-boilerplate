import type { FC } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";


const HomePage: FC = () => {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome, {user?.name}! 👋
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          You are logged in to the admin dashboard
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/products"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
          >
            View Products
          </Link>

          <button
            onClick={logout}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 font-semibold"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
