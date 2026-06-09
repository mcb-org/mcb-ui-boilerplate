import type { FC } from "react";
import { Link } from "react-router-dom";
import { useGetTestsQuery } from "../hooks/useTest";
import type { Test } from "../types";

const HomePage: FC = () => {
  const { data, isLoading, error } = useGetTestsQuery();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Our Vite File Base Routing Template
        </h1>
        <p className="text-lg text-blue-600">
          Your one-stop solution for building React applications with file-based
          routing using Vite. Explore our products and their details with ease!
        </p>

        <div className="mt-6">
          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            View Products
          </Link>
        </div>

        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <div>
            <h2>Tests:</h2>
            <ul>
              {data.map((test: Test) => (
                <li key={test.id}>{test.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
