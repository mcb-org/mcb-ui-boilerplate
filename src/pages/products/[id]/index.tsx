import type { FC } from "react";
import { useParams } from "react-router-dom";

const ProductsDetails: FC = () => {
  const { id } = useParams();
  return (
    <>
      <h3 className="text-lg font-semibold">Products Details</h3>
      <p className="text-blue-600">Products Details Found here for ID: {id}</p>
    </>
  );
};

export default ProductsDetails;
