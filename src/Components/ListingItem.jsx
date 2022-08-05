import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
function ListingItem({ listing, id }) {
  const navigate = useNavigate();
  const auth = getAuth();
  const handleAddToWish = async (listing) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        addItem();
        toast.success("Item added to wishList", { toastId: "r34-xAcu9#@(*" });
      } else if (!user) {
        toast.info("Please log in", { toastId: "r34-xAcu9#@(*" });
        // navigate("/sign-in");
        return;
      }
    });
    const addItem = async () => {
      const wishItem = {
        ...listing,
        wishRef: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      };
      console.log(wishItem);
      try {
        await addDoc(collection(db, "wishlists"), wishItem);
      } catch (error) {
        toast.error("An error occured");
      }
    };
  };

  return (
    <div className="w-full">
      <div className="relative">
        <Link to={`/category/${listing.brand}/${id}`}>
          <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img
              src={listing.imgUrls[0]}
              alt="listing"
              className="w-full h-56 object-center object-cover group-hover:opacity-75"
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{listing.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{listing.brand}</p>
          {listing.price !== "" && (
            <p className="mt-1 text-lg font-medium text-gray-900">
              ₦
              {[listing.price].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          )}
        </Link>
        <div className="absolute bottom-1 right-2">
          <button
            className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 hover:bg-blue-200"
            onClick={() => {
              handleAddToWish(listing);
            }}
          >
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListingItem;
