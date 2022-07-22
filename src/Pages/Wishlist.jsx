import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
function Wishlist() {
  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
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
  return <div>Wishlist</div>;
}

export default Wishlist;
