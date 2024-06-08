import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { IoMdExit } from "react-icons/io";

export function Sidebar({data}) {
  const role = useSelector((state) => state.auth.role)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(authActions.logout())
    localStorage.removeItem("id")
    localStorage.removeItem("token")
    localStorage.removeItem("role")
  }
  return (
    <div className="bg-zinc-800 rounded p-2 sm:p-4 flex flex-row lg:flex-col lg:justify-between items-center gap-1 sm:gap-8 h-auto lg:h-[83vh] ">
      <div className="flex flex-col gap-2 items-center justify-center w-1/3 md:w-1/3 lg:w-full">
        <img src={data.avatar} className="h-[5vh] sm:h-[12vh]"/>
        <p className="text-base sm:text-xl font-semibold text-zinc-100">{data.username}</p>
        <p className="w-full text-sm sm:text-lg text-center break-words text-zinc-300 ">{data.email}</p>
        <div className="lg:w-full lg:h-[2px] bg-zinc-500 lg:block"></div>
      </div>
      <div className="flex flex-col items-center justify-center w-2/3 md:w-1/3 lg:w-full">
        {
          role === "user" && (
            <div className="w-full flex flex-col items-center justify-center">
              <Link to="/profile" className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all text-base sm:text-lg duration-300">Favourites</Link>
              <Link to="/profile/orderHistory" className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center text-base sm:text-lg hover:bg-zinc-900 rounded transition-all duration-300">Order History</Link>
              <Link to="/profile/settings" className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all text-base sm:text-lg  duration-300">Settings</Link>
            </div>
          )
        }
        {
          role === "admin" && (
            <div className="w-full flex flex-col items-center justify-center">
              <Link to="/profile" className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all text-base sm:text-lg duration-300">All Orders</Link>
              <Link to="/profile/adminAddBook" className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center text-base sm:text-lg hover:bg-zinc-900 rounded transition-all duration-300">Add Book</Link>
            </div>
          )
        }      

      </div>
      <Link
              onClick={handleLogout}
              to="/"
              className={`px-4 py-2 bg-zinc-900 hover:bg-white w-3/6 md:w-1/3 lg:w-full rounded hover:text-zinc-800 text-white transition-all duration-300 flex items-center justify-center gap-2 text-base sm:text-lg font-semibold`}
            >
              Logout <IoMdExit className="h-6 w-6" />
      </Link>
    </div>
  )
}
