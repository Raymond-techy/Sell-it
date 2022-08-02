import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FaWhatsapp } from "react-icons/fa";
import { db } from "../firebase.config";
function Productpage() {
  const [listing, setListing] = useState();
  const [imgSrc, setimgSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "listings", params.productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        setListing(docSnap.data());
        console.log(listing);
      } else {
        console.log("product not found");
      }
      setTimeout(() => {
        // setimgSrc(listing.imgUrls[0]);
        setLoading(false);
      }, 6000);
    };
    fetchProduct();
  }, [params.productId]);
  if (loading) return <h2>Loading....</h2>;
  return (
    <div className="">
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex-col relative">
            {imgSrc === "" ? (
              <img
                alt="ecommerce"
                className="lg:w-full w-full lg:h-80 h-auto object-contain object-center rounded"
                src={listing.imgUrls[0]}
              />
            ) : (
              <img
                alt="ecommerce"
                className="lg:w-full w-full lg:h-80 h-auto object-contain object-center rounded"
                src={imgSrc}
              />
            )}
            <div className="container grid gap-2 ml-auto grid-cols-4 container mx-auto mt-2 px-auto justify-center items-center">
              {listing.imgUrls.map((img, index) => (
                <span
                  key={index}
                  className=" rounded cursor-pointer"
                  onClick={() => {
                    setimgSrc(img);
                  }}
                >
                  {" "}
                  <img
                    alt="ecommerce"
                    className={
                      imgSrc === img
                        ? "h-16 w-16 object-contain object-center rounded border-blue-900 bg-blue-900 p-1"
                        : "h-16 w-16 object-contain object-center"
                    }
                    src={img}
                  />
                </span>
              ))}
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {listing.brand}
              </h2>
              <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">
                {listing.name}
              </h1>

              <p className="leading-relaxed">{listing.message}</p>
              <div className="flex mt-6 items-center justify-between pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex flex-wrap">
                  <span className="mr-3">Ram:{listing.ram}</span>
                  <span className="mr-3">Internal Storage:{listing.rom}</span>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${listing.price}
                </span>
                <button className="flex ml-auto flex-row text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  <a href={`yufbb`} className="inline-block">
                    Buy via <FaWhatsapp color="green" />
                  </a>
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Productpage;