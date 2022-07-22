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
import { list } from "firebase/storage";
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
    <div className="container grid grid-cols-4 gap-4 mt-28">
      {listings.map((listing) => (
        <div key={listing.id}>
          <ListingItem listing={listing.data} id={listing.id} />
        </div>
      ))}
    </div>
  );
}

export default CategoryPage;
