import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  where,
  query,
  orderBy,
  limit,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";
import ProductListing from "../Components/ProductListing";
function Myproduct() {
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);
  const handleDelete = async (listingId) => {
    try {
      await deleteDoc(doc(db, "listings", listingId));
      const updatedListing = (listingId) => {
        myProducts.filter((product) => product.id !== listingId);
      };
      console.log(updatedListing);
      setMyProducts(updatedListing);
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };
  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const docRef = collection(db, "listings");
        const q = query(
          docRef,
          where("userRef", "==", auth.currentUser.uid),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        const docSnap = await getDocs(q);
        const myItems = [];
        docSnap.forEach((doc) => {
          return myItems.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setMyProducts(myItems);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("An error occured", { toastId: "YU$V%^^$T%$G" });
        navigate("/");
      }
    };
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          fetchMyProducts();
          console.log(myProducts, "From my product");
        } else if (!user) {
          navigate("/sign-in");
          toast.info("Please log in", { toastId: "r34-xAcu9#GH@(*" });
          return;
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);
  if (loading) return <Spinner description="loading" />;
  return (
    <>
      {myProducts.length !== 0 ? (
        <div className="max-w-2xl mx-auto py-24 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            My products
          </h2>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {myProducts.map((listing) => (
              <div key={listing.id} className="group relative">
                <ProductListing
                  listing={listing.data}
                  id={listing.id}
                  handleRemove={handleDelete}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto py-24 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 m-auto">
            You've No products for sale.
          </h2>
        </div>
      )}
    </>
  );
}

export default Myproduct;
