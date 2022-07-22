import { useState, useEffect, useRef } from "react";
import { FaPencilAlt, FaSave } from "react-icons/fa";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { Card } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    userNumber: "",
  });
  const [changeDetails, setChangeDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    displayName: "",
  });
  const textref = useRef(null);
  const auth = getAuth();
  useEffect(() => {
    const fetchUserDetails = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      const usep = docSnap.data();
      setUser((prevState) => ({
        ...prevState,
        userName: usep.fullName,
        userNumber: usep.mobileNumber,
      }));
      setFormData((prevState) => ({
        ...prevState,
        name: usep.fullName,
        email: usep.email,
        number: usep.mobileNumber,
        displayName: usep.displayName,
      }));
      setLoading(false);
    };
    fetchUserDetails();
  }, [auth.currentUser.uid]);
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };
  const { userName, userNumber } = user;
  const onSubmit = async () => {
    try {
      if (name !== userName || number !== userNumber) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          mobileNumber: number,
        });
      } else if (name === userName && number === userNumber) {
        toast.error("No update was made");
        return;
      }
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        fullName: name,
        mobileNumber: number,
      });
      toast.success("Profile updated");
    } catch (error) {
      toast.error("Unable to update profile");
    }
  };
  const onfocusElem = () => {
    textref.current.focus();
  };
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const { name, email, number, displayName } = formData;
  //
  if (loading)
    return (
      <>
        <div className="top-margins">
          <div className="bg-white md:w-1/2 w-full mx-auto p-2 sm:p-4 h-64 sm:h-full rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none">
            <div className="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse"></div>
            <div className="flex flex-col flex-1 gap-5 sm:p-2">
              <div className="flex flex-1 flex-col gap-3">
                <div className="bg-gray-200 w-full animate-pulse h-14 rounded-2xl"></div>
                <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
                <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
                <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
                <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl"></div>
              </div>
              <div className="mt-auto flex gap-3">
                <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full"></div>
                <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full"></div>
                <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full ml-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  return (
    <div className="m-0 sm:m-4 overflow-x-hidden">
      <Card>
        <div className="flex flex-col items-center pt-8 h-screen">
          <div className="relative">
            <img
              className="mb-3 h-24 w-24 rounded-full shadow-lg hover:opacity-50"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="Bonnie"
            />
            <FaPencilAlt
              className="absolute top-3 right-3 cursor-pointer"
              color="red"
            />
          </div>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {displayName}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Visual Designer
          </span>
          <div className="mt-4 flex space-x-3 lg:mt-6 cursor-pointer">
            <div
              className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={onLogout}
            >
              Logout
            </div>
            <div className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
              {changeDetails ? (
                <span
                  className="flex cursor-pointer"
                  onClick={() => {
                    changeDetails && onSubmit();
                    setChangeDetails((prevState) => !prevState);
                  }}
                >
                  Save Profile
                  <FaSave className="ml-2 mt-1" color="blue" />
                </span>
              ) : (
                <span
                  className="flex"
                  onClick={() => {
                    onfocusElem();
                    setChangeDetails((prevState) => !prevState);
                  }}
                >
                  Edit Profile
                  <FaPencilAlt className="ml-2 mt-1" color="blue" />
                </span>
              )}
            </div>
          </div>
          <div className="px-4 py-5 m-4 sm:px-6  border-bottom dark:bg-gray-800 bg-white shadow mb-2 rounded-md justify-center align-center sm:ml-2">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Personal Details
            </h3>
          </div>
          <form className="flex flex-col justify-center align-center place-content-center">
            <input
              className={
                changeDetails
                  ? "bg-slate-200 px-4 py-5 w-80 sm:w-96 ml-8 sm:ml-2 border-blue bg-indigo-50 shadow mb-2 rounded-md"
                  : "px-4 py-5 w-80 sm:w-96 ml-8 sm:ml-2 sm:ml-2 border dark:bg-gray-800 border-transparent bg-indigo-50 shadow mb-2 rounded-md"
              }
              type="text"
              value={name}
              disabled={!changeDetails}
              // autoFocus={changeDetails}
              id="name"
              onChange={onChange}
              ref={textref}
            />
            {changeDetails && (
              <p className="ml-8 sm:ml-2 text-pink-600 text-sm">
                Edit full name.
              </p>
            )}
            <input
              className="px-2 py-4 m-2 sm:px-6 lg:py-2 w-80 sm:w-96 ml-8 sm:ml-2 border dark:bg-gray-800 border-transparent bg-indigo-50 shadow mb-2 rounded-md"
              type="text"
              value={email}
              disabled
              readOnly
            />{" "}
            <input
              className={
                changeDetails
                  ? "bg-slate-50 px-4 py-5 w-80 sm:w-96 ml-8 sm:ml-2 focus:border-sky-500 border-transparent bg-indigo-50 shadow  rounded-md"
                  : "px-4 py-5 w-80 sm:w-96 ml-8 sm:ml-2 sm:ml-2 border dark:bg-gray-800 border-transparent bg-indigo-50 shadow rounded-md"
              }
              type="text"
              id="number"
              value={number}
              disabled={!changeDetails}
              autoFocus={changeDetails}
              onChange={onChange}
            />
            {changeDetails && (
              <p className="ml-8 sm:ml-2 text-pink-600 text-sm">
                Edit mobile number.
              </p>
            )}
          </form>
          <Link
            to="/create-listing"
            className="px-4 py-5 w-64 sm:w-96 ml-8 sm:ml-2 mt-4 rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Post an Item for Sale
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Profile;
