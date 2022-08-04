import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import ListingItem from "../Components/ListingItem";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
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
      <div className="flex-row justify-center items-center mt-16 container">
        <div className="">
          <img
            src={gadImg}
            alt="phone sales"
            className="w-full h-auto md:mx-8"
          />
        </div>
        <div className="flex flex-wrap justify-center align-center mt-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-2">
            Top categories
          </h2>
        </div>
        <div className="flex flex-wrap justify-evenly align-center p-4">
          <Link to="/category/iphone">
            <FaApple size={40} color="#333" className="mx-auto" /> iPhone
          </Link>
          <Link to="/category/samsung">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              width="30px"
              height="32px"
              className="mx-auto"
            >
              <path d="M349.9 379.1c-6.281 36.63-25.89 65.02-56.69 82.11c-24.91 13.83-54.08 18.98-83.73 18.98c-61.86 0-125.8-22.42-157.5-35.38c-16.38-6.672-24.22-25.34-17.55-41.7c6.641-16.36 25.27-24.28 41.7-17.55c77.56 31.64 150.6 39.39 186.1 19.69c13.83-7.672 21.67-19.42 24.69-36.98c7.25-42.31-18.2-56.75-103.7-81.38C112.6 266.6 15.98 238.7 34.11 133.2c5.484-32 23.64-59.36 51.14-77.02c45.59-29.33 115-31.87 206.4-7.688c17.09 4.531 27.27 22.05 22.75 39.13s-22.06 27.23-39.13 22.75C184 86.17 140.4 96.81 119.8 110c-12.55 8.062-20.17 19.5-22.66 34c-7.266 42.31 18.19 56.75 103.7 81.38C271.4 245.7 368 273.5 349.9 379.1z" />
            </svg>
            Samsung
          </Link>
          <Link to="/category/tecno">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              width="30px"
              height="32px"
              className="mx-auto"
            >
              <path d="M384 64.01c0 17.67-14.33 32-32 32h-128v352c0 17.67-14.33 31.99-32 31.99s-32-14.32-32-31.99v-352H32c-17.67 0-32-14.33-32-32s14.33-32 32-32h320C369.7 32.01 384 46.34 384 64.01z" />
            </svg>
            Tecno
          </Link>
          <Link to="/category/itel">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              width="30px"
              height="32px"
              className="mx-auto"
            >
              <path d="M384 64.01c0 17.67-14.33 32-32 32h-128v352c0 17.67-14.33 31.99-32 31.99s-32-14.32-32-31.99v-352H32c-17.67 0-32-14.33-32-32s14.33-32 32-32h320C369.7 32.01 384 46.34 384 64.01z" />
            </svg>
            itel
          </Link>
        </div>
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
      {!loading && listings.length > 1 && <Footer />}
    </>
  );
}

export default Explore;
