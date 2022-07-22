import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowCircleRight, FaEyeSlash, FaEye } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { Button, Spinner } from "flowbite-react";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { email, password } = formData;
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        setLoading(false);
        navigate("/profile");
      }
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/network-request-failed") {
        toast.error(
          "Network Error",
          { toastId: "r34-xAcu9#@(*" },
          { autoClose: 1000 }
        );
      } else {
        toast.error(
          "Invalid Email or password",
          { toastId: "r34-xAcu93#@(*" },
          { autoClose: 1000 }
        );
      }
    }
    setLoading(false);
  };
  const passwordToggle = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/sign-up"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register to get Started
            </Link>
          </p>
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-4"
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
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          {/* <select
            id="currency"
            name="currency"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            value={currency}
            onChange={onChange}
            placeholder="Product category"
          >
            <option>Select Product category</option>
            <option>USD</option>
            <option>CAD</option>
            <option>EUR</option>
          </select> */}
          <div>
            {loading ? (
              <div className="group relative w-full flex justify-center border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Button>
                  <Spinner color="info" />
                  <span>Loading...</span>
                </Button>
              </div>
            ) : (
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
                <span className="absolute right-4 inset-y-0 flex items-center pl-3">
                  <FaArrowCircleRight
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    color="white"
                  />
                </span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
