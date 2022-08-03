import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import WishItem from "../Components/WishItem";
function Wishlist() {
  const [wishLists, setWishList] = useState([]);
  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    const fetchWishList = async () => {
      const docRef = collection(db, "wishlists");
      const q = query(
        docRef,
        where("wishRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
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
      console.log(wishItems);
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
  return (
    <div className="mt-24">
      {wishLists.map((wishlist) => (
        <div key={wishlist.id}>
          <WishItem WishItem={wishlist.data} />
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
