import { Link } from "react-router-dom";

import { FaTrash } from "react-icons/fa";
function ProductListing({ listing, id, handleRemove }) {
  return (
    <div className="w-full">
      <div className="relative">
        <Link to={`/category/${listing.brand}/${id}`}>
          <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img
              src={listing.imgUrls[0]}
              alt="listing"
              className="w-full h-56 object-center object-cover group-hover:opacity-75"
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{listing.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{listing.brand}</p>
          <p className="mt-1 text-lg font-medium text-gray-900">
            ₦{listing.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        </Link>
        <div className="absolute bottom-1 right-2">
          <button
            className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 hover:bg-blue-200"
            onClick={() => {
              handleRemove(id);
            }}
          >
            <FaTrash className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
