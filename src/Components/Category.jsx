import { Link } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import { ReactComponent as Samsvg } from "../Components/Assets/samsung-s-svgrepo-com.svg";
function Category() {
  return (
    <div>
      <div className="relative px-4 sm:px-0">
        <div className="absolute inset-0 bg-gray-100 h-1/2" />
        <div className="relative grid mx-auto overflow-hidden bg-white divide-y rounded shadow sm:divide-y-0 sm:divide-x sm:max-w-screen-sm sm:grid-cols-3 lg:max-w-screen-md">
          <div className="inline-block p-8 text-center">
            <Link to="/category/iphone">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-50">
                <FaApple className="w-10 h-10 text-purple-400" />
              </div>
              <p className="font-bold tracking-wide text-gray-800">iPhone</p>
            </Link>
          </div>
          <div className="inline-block p-8 text-center">
            <Link to="/category/samsung">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-50">
                <Samsvg className="w-10 h-10 text-purple-400" />
              </div>
              <p className="font-bold tracking-wide text-gray-800">Samsung</p>
            </Link>
          </div>
          <div className="inline-block p-8 text-center">
            <Link to="/category/itel">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-50">
                <svg
                  className="w-10 h-10 text-deep-purple-accent-400"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
              <p className="font-bold tracking-wide text-gray-800">Itel</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
