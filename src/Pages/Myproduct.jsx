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
import Spinner from "../Components/Spinner";
function Myproduct() {
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

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
  return <div>Myproduct</div>;
}

export default Myproduct;
