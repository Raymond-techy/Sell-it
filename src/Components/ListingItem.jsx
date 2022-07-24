import React from "react";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
function ListingItem({ listing, id }) {
  const auth = getAuth();
  const handleAddToWish = async (listing) => {
    const wishItem = {
      ...listing,
      wishRef: auth.currentUser.uid,
      timestamp: serverTimestamp(),
    };
    await addDoc(collection(db, "wishlists"), wishItem);

    console.log(wishItem);
  };
  return (
    <div className="sm:w-64 w-4/5 md:w-3/4">
      <Link to={`/category/${listing.brand}/${id}`}>
        <div>
          <span className="block relative h-48 rounded overflow-hidden">
            <img
              alt="ecommerce"
              className="object-cover object-center w-full h-full block"
              src={listing.imgUrls[0]}
            />
          </span>
          <div className="mt-4">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
              {listing.brand}
            </h3>
            <h3 className="text-gray-900 title-font text-lg font-medium">
              {listing.name}
            </h3>
          </div>
        </div>
      </Link>
      <div className="flex flex-row justify-between pr-4">
        <p className="mt-1">${listing.price}</p>

        <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 hover:bg-blue-200">
          <svg
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            onClick={() => {
              handleAddToWish(listing);
            }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ListingItem;
