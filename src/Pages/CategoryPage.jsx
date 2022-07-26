import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import ListingItem from "../Components/ListingItem";
import { db } from "../firebase.config";
import Spinner from "../Components/Spinner";
function CategoryPage() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    const fetchListings = async () => {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("brand", "==", params.categoryType),
        orderBy("timestamp", "desc"),
        limit(12)
      );
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
    };
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.CategoryType]);

  if (loading) return <Spinner description="loading" />;
  return (
    <>
      {listings.length !== 0 ? (
        <div className="max-w-2xl mx-auto py-24 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            {params.categoryType}
          </h2>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {listings?.map((listing) => (
              <div key={listing.id} className="group relative">
                <ListingItem listing={listing.data} id={listing.id} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="max-w-2xl mx-auto py-24 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
              {params.categoryType}
            </h2>
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 m-auto">
              No products exist under this category.
            </h2>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryPage;
