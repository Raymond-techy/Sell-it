import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    displayName: "",
    mobileNumber: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { fullName, displayName, mobileNumber, email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName,
        userEmail: email,
        userMobile: mobileNumber,
      });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Account successfully registered");
      setLoading(false);
      navigate("/sign-in");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.warning("Email has already been registered");
        return;
      } else if (error.code === "auth/weak-password") {
        toast.warning("Use a strong password");
        return;
      }
    }
  };
  const passwordToggle = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/sign-in"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in to continue
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitForm}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mt-4 ">
              <label htmlFor="email-address" className="sr-only">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                value={fullName}
                placeholder="Full Name"
                onChange={onChange}
              />
            </div>
            <div className="mt-4 ">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                value={email}
                placeholder="Email address"
                onChange={onChange}
              />
            </div>
            <div className="passwordBox">
              <label htmlFor="password" className="sr-only ">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                placeholder="Password"
                value={password}
                onChange={onChange}
              />
              {!passwordVisible && (
                <FaEye
                  className="visible"
                  size={15}
                  color="#1e1e1e"
                  onClick={passwordToggle}
                />
              )}
              {passwordVisible && (
                <FaEyeSlash
                  className="visible"
                  size={15}
                  color="#1e1e1e"
                  onClick={passwordToggle}
                />
              )}
            </div>
            <div className="mt-4 ">
              <label htmlFor="email-address" className="sr-only">
                Display Name
              </label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                value={displayName}
                placeholder="Display Name"
                onChange={onChange}
              />
            </div>
            <div className="mt-4 ">
              <label htmlFor="email-address" className="sr-only">
                Mobile Number
              </label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                value={mobileNumber}
                placeholder="Mobile Number(e.g+2348114992750)"
                onChange={onChange}
              />
            </div>
          </div>
          <div>
            {loading ? (
              <FaSpinner />
            ) : (
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FaUserAlt className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                </span>
                Sign Up
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
