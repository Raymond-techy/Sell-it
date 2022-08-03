import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { FaCheck, FaDashcube } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { FaWhatsapp } from "react-icons/fa";
import { db } from "../firebase.config";
import Spinner from "../Components/Spinner";
function Productpage() {
  const [listing, setListing] = useState();
  const [imgSrc, setimgSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "listings", params.productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        setListing(docSnap.data());
      } else {
        navigate("/");
      }
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };
    fetchProduct();
  }, [params.productId]);
  if (loading || listing.length === 0)
    return <Spinner description="loading..." />;
  return (
    <div className="">
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 pt-24 mx-auto">
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

              <p className="leading-relaxed">{listing.description}</p>
            </div>
          </div>
        </div>
      </section>
      {/* Item description */}
      <section class="text-gray-600 body-font">
        <div class="container px-5 mx-auto">
          <div class="lg:w-2/3 w-full mx-auto overflow-auto">
            <table class="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th class="px-4 py-3 title-font tracking-wider font-lg text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Product
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-lg text-gray-900 text-sm bg-gray-100">
                    Details
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"></th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="px-4 py-3">Ram</td>
                  <td class="px-4 py-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width="20px"
                      height="20px"
                    >
                      <path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z" />
                    </svg>
                  </td>
                  <td class="px-4 py-3">{listing.ram}</td>
                </tr>
                <tr>
                  <td class="border-t-2 border-gray-200 px-4 py-3">
                    Internal Storage
                  </td>
                  <td class="border-t-2 border-gray-200 px-4 py-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width="30px"
                      height="20px"
                    >
                      <path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z" />
                    </svg>
                  </td>
                  <td class="border-t-2 border-gray-200 px-4 py-3">
                    {listing.rom}
                  </td>
                </tr>
                <tr>
                  <td class="border-t-2 border-gray-200 px-4 py-3">
                    Seller's Location
                  </td>
                  <td class="border-t-2 border-gray-200 px-4 py-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width="30px"
                      height="20px"
                    >
                      <path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z" />
                    </svg>
                  </td>
                  <td class="border-t-2 border-gray-200 px-4 py-3">
                    {listing.location}
                  </td>
                </tr>
                <tr>
                  <td class="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                    Selfie Camera
                  </td>
                  <td class="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width="30px"
                      height="20px"
                    >
                      <path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z" />
                    </svg>
                  </td>
                  <td class="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                    {listing.selfieCamera === "Yes" ? (
                      <FaCheck />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        width="25px"
                        height="25px"
                      >
                        <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                      </svg>
                    )}
                  </td>
                </tr>
                <tr>
                  <td class="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                    Main Camera
                  </td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width="20px"
                      height="20px"
                    >
                      <path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z" />
                    </svg>
                  </td>
                  <td class="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                    {listing.mainCamera === "Yes" ? (
                      <FaCheck />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        width="20px"
                        height="20px"
                      >
                        <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                      </svg>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
            <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
              Buy Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Productpage;
