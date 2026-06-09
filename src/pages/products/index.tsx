import type { FC } from "react";
import { Link } from "react-router-dom";

const Products: FC = () => {
  return (
    <>
      <h3 className="text-lg font-semibold">Products</h3>
      <p className="text-blue-600">Products Found here</p>
      <Link to="/products/1" className="text-blue-500 hover:underline">
        View Product Details
      </Link>
    </>
  );
};

export default Products;
