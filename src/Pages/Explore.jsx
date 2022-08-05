import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import ListingItem from "../Components/ListingItem";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Category from "../Components/Category";
import gadImg from "../Components/Assets/gad.png";
import { FaApple } from "react-icons/fa";
import Spinner from "../Components/Spinner";
import Footer from "../Components/Footer";
function Explore() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(listingRef, orderBy("timestamp", "desc"), limit(12));
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Couldnt fetch listings");
      }
    };
    fetchListings();
  }, []);

  if (loading || listings.length === 0)
    return (
      <div>
        <Spinner description="sellIt" />
      </div>
    );
  return (
    <>
      <div className="flex-row justify-center items-center mt-16">
        <div className="">
          <div className="bg-purple-700">
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
              <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
                <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
                  <a href="/" className="mb-6 sm:mx-auto">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-400">
                      <svg
                        className="w-10 h-10 text-deep-purple-900"
                        stroke="currentColor"
                        viewBox="0 0 52 52"
                      >
                        <polygon
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                          points="29 13 14 29 25 29 23 39 38 23 27 23"
                        />
                      </svg>
                    </div>
                  </a>

                  <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto">
                      <span className="relative inline-block">
                        <svg
                          viewBox="0 0 52 24"
                          fill="currentColor"
                          className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-deep-purple-accent-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                        >
                          <defs>
                            <pattern
                              id="700c93bf-0068-4e32-aafe-ef5b6a647708"
                              x="0"
                              y="0"
                              width=".135"
                              height=".30"
                            >
                              <circle cx="1" cy="1" r=".7" />
                            </pattern>
                          </defs>
                          <rect
                            fill="url(#700c93bf-0068-4e32-aafe-ef5b6a647708)"
                            width="52"
                            height="24"
                          />
                        </svg>
                        <span className="relative">The</span>
                      </span>{" "}
                      One place to Sell it
                    </h2>
                    <p className="text-base text-indigo-100 md:text-lg">
                      buying and selling products from friends near you at very
                      affordable price .
                    </p>
                  </div>
                  <div>
                    <Link
                      to="/sign-up"
                      className="inline-flex items-center justify-center h-12 px-6 font-semibold tracking-wide text-teal-900 transition duration-200 rounded shadow-md hover:text-purple-900 bg-teal-400 hover:bg-deep-purple-100 focus:shadow-outline focus:outline-none"
                    >
                      Get started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center align-center mt-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-2">
            Top categories
          </h2>
        </div>
        <Category />

        <div>
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Trending Product
            </h2>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {listings.map((listing) => (
                <div key={listing.id} className="group relative">
                  <ListingItem listing={listing.data} id={listing.id} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-400">
              Make history
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                    id="84d09fa9-a544-44bd-88b2-08fdf4cddd38"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#84d09fa9-a544-44bd-88b2-08fdf4cddd38)"
                  width="52"
                  height="24"
                />
              </svg>
              <span className="relative">Let's</span>
            </span>{" "}
            showcase your products to the world
          </h2>
          <p className="text-base text-gray-700 md:text-lg"></p>
        </div>
        <div className="grid gap-8 row-gap-5 md:row-gap-8 lg:grid-cols-3">
          <div className="p-5 duration-300 transform bg-white border-2 border-dashed rounded shadow-sm border-deep-purple-accent-100 hover:-translate-y-2">
            <div className="flex items-center mb-2">
              <p className="flex items-center justify-center w-10 h-10 mr-2 text-lg font-bold text-white rounded-full bg-purple-400">
                1
              </p>
              <p className="text-lg font-bold leading-5">Sign up</p>
            </div>
            <p className="text-sm text-gray-900">
              Take a liitle of your time and fill the registeration form to get
              started.
            </p>
          </div>
          <div className="p-5 duration-300 transform bg-white border-2 border-dashed rounded shadow-sm border-deep-purple-accent-200 hover:-translate-y-2">
            <div className="flex items-center mb-2">
              <p className="flex items-center justify-center w-10 h-10 mr-2 text-lg font-bold text-white rounded-full bg-purple-400">
                2
              </p>
              <p className="text-lg font-bold leading-5">Sell it</p>
            </div>
            <p className="text-sm text-gray-900">
              Fill in your product details to list your item for sale .
            </p>
          </div>
          <div className="relative p-5 duration-300 transform bg-white border-2 rounded shadow-sm border-deep-purple-accent-700 hover:-translate-y-2">
            <div className="flex items-center mb-2">
              <p className="flex items-center justify-center w-10 h-10 mr-2 text-lg font-bold text-white rounded-full bg-purple-400">
                3
              </p>
              <p className="text-lg font-bold leading-5">Shoot for the stars</p>
            </div>
            <p className="text-sm text-gray-900">
              Leave the rest to us your product is live.
            </p>
            <p className="absolute top-0 right-0 flex items-center justify-center w-8 h-8 -mt-4 -mr-4 font-bold rounded-full bg-purple-400 sm:-mt-5 sm:-mr-5 sm:w-10 sm:h-10">
              <svg
                className="text-white w-7"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <polyline
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  points="6,12 10,16 18,8"
                />
              </svg>
            </p>
          </div>
        </div>
      </div>
      {!loading && listings.length > 1 && <Footer />}
    </>
  );
}

export default Explore;
