import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import logoImg from "../Components/Assets/Picture73.png";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("A reset link was sent");
    } catch (error) {
      toast.error("Could not send reset Link");
    }
  };
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src={logoImg}
            alt="sellit logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitForm}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={email}
                placeholder="Email address"
                onChange={onChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Retrieve password
              <span
                className="absolute right-2
               inset-y-0 flex items-center pl-3"
              >
                <FaArrowRight className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
              </span>
            </button>
          </div>
        </form>
        <div className="flex justify-center align-center">
          <hr />
          <p>OR</p>
          <hr />
        </div>
        <Link
          to="/sign-in"
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login to continue
          <span
            className="absolute right-2
               inset-y-0 flex items-center pl-3"
          >
            <FaArrowRight className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
