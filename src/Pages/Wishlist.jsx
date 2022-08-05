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
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import WishItem from "../Components/WishItem";
import Spinner from "../Components/Spinner";
function Wishlist() {
  const [wishLists, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const docRef = collection(db, "wishlists");
        const q = query(
          docRef,
          where("wishRef", "==", auth.currentUser.uid),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        const docSnap = await getDocs(q);
        const wishItems = [];
        docSnap.forEach((doc) => {
          return wishItems.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setWishList(wishItems);
        setLoading(false);
      } catch (error) {
        toast.error("unable to get wish lists", { toastId: "YU$V%^^$TG" });
        navigate("/");
      }
    };
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          fetchWishList();
        } else if (!user) {
          navigate("/sign-in");
          toast.info(
            "Please log in",
            { toastId: "r34-xAcu9#@(*" },
            { autoClose: 10000 }
          );
          return;
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  if (loading) return <Spinner description="Loading" />;
  if (wishLists.length === 0) {
    return (
      <div>
        <h1 className="sm:text-4xl text-2xl font-medium title-font mb-2 text-gray-900">
          You Have not added any item to your wish
        </h1>
      </div>
    );
  }
  return (
    <div className="mt-16 pb-24">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-8">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
              Your Saved Item
            </h1>
          </div>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl"></th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Name
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Qty
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Price
                  </th>
                  <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                </tr>
              </thead>
              <tbody>
                {wishLists.map((wishlist) => (
                  <WishItem
                    WishItem={wishlist.data}
                    id={wishlist.id}
                    key={wishlist.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Wishlist;
