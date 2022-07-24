import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import ListingItem from "../Components/ListingItem";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
function CategoryPage() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("brand", "==", params.categoryType),
          limit(10)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        console.log(listings);
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Couldnt fetch listings");
      }
    };
    fetchListings();
  }, [params.CategoryType]);

  if (loading || listings.length === 0)
    return (
      <h1
        style={{
          marginBottom: "100px",
          height: "100vh",
          background: "blue",
          margin: "0 auto",
        }}
      >
        Loading
      </h1>
    );
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-5 mx-auto mt-16">
        <div className="grid grid-cols-2 gap-4 sm:gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 md:gap-8">
          {listings.map((listing) => (
            <div key={listing.id}>
              <ListingItem listing={listing.data} id={listing.id} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryPage;
