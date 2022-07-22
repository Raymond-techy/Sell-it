import React from "react";
import { Link } from "react-router-dom";
import {} from "react-icons/fa";
function ListingItem({ listing, id }) {
  return (
    <Link to={`/category/${listing.brand}/${id}`}>
      <div className="shadow-lg rounded-2xl  bg-white w-56 m-auto p-2">
        <img
          src={listing.imgUrls[0]}
          alt="adidas"
          className="w-44 h-36 m-auto rounded-md"
        />
        <div className="bg-pink-200 p-4 rounded-lg">
          <p className="text-white text-xl font-bold ">{listing.name}</p>
          <p className="text-gray-50 text-xs">{listing.brand}</p>
          <div className="flex items-center justify-between ">
            <span className="flex">
              <p className="text-grey-500 text-lg">
                {listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </span>
            <button
              type="button"
              className="w-10 h-10 text-base font-medium rounded-full text-white bg-pink-500 hover:bg-pink-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="mx-auto"
                fill="white"
                viewBox="0 0 1792 1792"
              >
                <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ListingItem;
