import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { useSelector } from "react-redux";

export function Navbar() {
  const Links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    }
  ];
  
  const [mobileNav, setMobileNav] = useState("hidden");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role)

  if (!isLoggedIn) {
    Links.splice(2, 3);
  }

  if(isLoggedIn && role === "user"){
    Links.splice(4,1)
  }

  if(isLoggedIn && role === "admin"){
    Links.splice(3,1)
  }

  return (
    <>
      <div className="sticky backdrop-blur-md top-0 left-0 flex z-50 mx-auto  text-white p-3 sm:py-4 sm:px-8 items-center  justify-between">
        <div className="flex items-center md:w-1/2 lg:w-2/3">
          <img
            className="h-7 sm:h-10 me-2 sm:me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
          <Link to="/" className="text-xl sm:text-2xl font-semibold">BookHeaven</Link>
        </div>
        <div className="nav-links-bookheaven flex items-center gap-4 md:w-1/2 lg:w-1/3 ">
          <div className="hidden md:flex w-full justify-around gap-4">
            {Links.map((items, i) => (
              <Link
                to={items.link}
                className="hover:text-blue-500 transition-all duration-300 md:text-xl"
                key={i}
              >
                {items.title}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex gap-4 ">
            {
              !isLoggedIn && 
              <div className="flex gap-4">
                <Link
                  to="/signin"
                  className="px-4 py-2 border border-blue-500 rounded hover:text-zinc-800 hover:bg-white transition-all duration-300 lg:text-xl"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-500 rounded hover:text-zinc-800 hover:bg-white transition-all duration-300 lg:text-xl"
                >
                  Signup
                </Link>
              </div>
            }
          </div>

          <button
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
            className="md:hidden hover:text-yellow-100 hover:bg-zinc-700 rounded-full"
          >
            {mobileNav === "hidden" ? (
              <FiMenu className="h-8 w-8" />
            ) : (
              <FiX className="h-8 w-8" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`${mobileNav} fixed top-0 left-0 w-full z-40  backdrop-blur-md text-white text-xl flex flex-col items-center border-b border-zinc-600 pt-24 gap-5 p-4`}
      >
        {Links.map((items, i) => (
          <Link
            onClick={() => setMobileNav("hidden")}
            to={items.link}
            className={`hover:text-blue-500 ${mobileNav}  transition-all duration-300`}
            key={i}
          >
            {items.title}
          </Link>
        ))}
        {!isLoggedIn && (
          <div className="flex flex-col gap-5">
            <Link
              onClick={() => setMobileNav("hidden")}
              to="/signin"
              className={`${mobileNav} px-4 py-2 border border-blue-500 rounded hover:text-zinc-800 hover:bg-white transition-all duration-300 lg:text-xl text-center`}
            >
              Login
            </Link>
            <Link
              onClick={() => setMobileNav("hidden")}
              to="/signup"
              className={`${mobileNav} px-4 py-2 bg-blue-500 rounded hover:text-zinc-800 hover:bg-white transition-all duration-300`}
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
