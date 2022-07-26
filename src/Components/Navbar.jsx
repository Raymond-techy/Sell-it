import { NavLink, Link, useLocation } from "react-router-dom";
import Sellit from "./Assets/Picture73.png";
import { ReactComponent as ExploreIcon } from "./Assets/exploreIcon.svg";

import { ReactComponent as PersonOutlineIcon } from "./Assets/personOutlineIcon.svg";
import { FaHeart, FaPlusCircle } from "react-icons/fa";
function Navbar() {
  const location = useLocation();
  const pathMatch = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };
  const navs = [
    { Title: "Explore", path: "/" },
    { Title: "WishList", path: "/wish-list" },
    { Title: "Sell Item", path: "/sell-item" },
    { Title: "Login", path: "/sign-in" },
    { Title: "Profile", path: "/profile" },
  ];
  const navsMobile = [
    {
      Nav: (
        <ExploreIcon
          fill={pathMatch("/") ? "#2c2c2c" : "#8f8f8f"}
          width="30px"
          height="30px"
        />
      ),
      path: "/",
      Text: "Explore",
    },
    {
      Nav: (
        <FaPlusCircle
          color={pathMatch("/sell-item") ? "#2c2c2c" : "#8f8f8f"}
          size={24}
        />
      ),
      path: "/sell-item",
      Text: "Sell Item",
    },
    {
      Nav: (
        <FaHeart
          color={pathMatch("/wish-list") ? "#2c2c2c" : "#8f8f8f"}
          size={24}
        />
      ),
      path: "/wish-list",
      Text: "WishList",
    },
    {
      Nav: (
        <PersonOutlineIcon
          width="30px"
          height="30px"
          fill={pathMatch("/profile") ? "#2c2c2c" : "#8f8f8f"}
        />
      ),
      path: "/profile",
      Text: "Profile",
    },
  ];
  return (
    <>
      <header className="text-gray-600 body-font bg-slate-200 w-screen fixed top-0 z-40 navmbt">
        <div className="container mx-auto flex p-0 md:flex-row sm:items-center items-end">
          <NavLink
            to="/"
            className="flex title-font font-medium items-center  text-gray-900 mb-4 md:mb-0"
          >
            <img src={Sellit} alt="logo" className="nav__logo" />
          </NavLink>
          <nav className="md:ml-auto md:mr-auto sm:flex flex-wrap items-center text-base justify-center hidden">
            {navs.map((navbar, index) => (
              <NavLink
                key={index}
                to={navbar.path}
                className={
                  pathMatch(navbar.path)
                    ? "mr-5 hover:text-blue-900 font-bold cursor-pointer"
                    : "p-2 mr-5 hover:text-zinc-900 cursor-pointer"
                }
              >
                {navbar.Title}
              </NavLink>
            ))}
          </nav>
          <button className="flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded leftSide text-base mt-4 md:mt-0">
            <NavLink to="/sign-up">Get Started</NavLink>
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
      <footer className="navbarMob">
        <div className="navbarNav">
          <ul className="navbarListItems">
            {navsMobile.map((nav, index) => (
              <Link to={nav.path} className="navbarListItem" key={index}>
                <span>{nav.Nav}</span>
                <p
                  className={
                    pathMatch(nav.path)
                      ? "navbarListItemNameActive"
                      : "navbarListItemName"
                  }
                >
                  {nav.Text}
                </p>
              </Link>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Navbar;
