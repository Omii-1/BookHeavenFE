import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { Pagination } from "../Pagination";

export function AdminAllOrder() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState()
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(10)

  const fetchAllOrder = async () => {
    try {
      const res = await axios.get(`${backendUrl}/get-all-orders`, {
        headers: {
          id: localStorage.getItem("id"),
          Authorization: localStorage.getItem("token"),
        }
      });
      setData(res.data.data)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async () => {
    const res = await axios.put(`${backendUrl}/update-status/${userId}`, {status} , {
      headers: {
        id: localStorage.getItem("id"),
        Authorization: localStorage.getItem("token"),
      }
    })
    if (res.data.status === "success") {
      // Update local state to reflect the change
      setData(prevData => prevData.map(item => 
        item._id === userId ? { ...item, status } : item
      ));
    }
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);

  const lastPostIndex =  currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentPosts = data.slice(firstPostIndex, lastPostIndex)

  return (
    <>
      {!loading && data.length === 0 && (
        <div>
          <h1>Orders are Empty</h1>
        </div>
      )}
      {loading && (
        <div>
          <Loader />
        </div>
      )}
      {!loading && data.length > 0 && (
        <div className="flex flex-col">
          <h1 className="py-4 text-3xl sm:text-6xl font-semibold text-zinc-400">
            ALL Order History
          </h1>
          <div className="flex">
            <div className="w-[5%] border rounded-tl py-2 bg-zinc-800">
              <p className="text-center font-bold ">Sr.</p>
            </div>
            <div className="w-[20%] border py-2 bg-zinc-800">
              <p className="text-center font-bold">Books</p>
            </div>
            <div className="w-[15%] border py-2 bg-zinc-800">
              <p className="text-center font-bold">Buyer name</p>
            </div>
            <div className="w-[15%] border py-2 bg-zinc-800">
              <p className="text-center font-bold">Address</p>
            </div>
            <div className="w-[15%] border py-2 bg-zinc-800">
              <p className="text-center font-bold">Date</p>
            </div>
            <div className="w-[10%] border py-2 bg-zinc-800">
              <p className="text-center font-bold">Price</p>
            </div>
            <div className="w-[20%] border py-2 bg-zinc-800 rounded-tr">
              <p className="text-center font-bold">Status</p>
            </div>
          </div>

          {currentPosts.map((data, i) => (
            <div className="flex" key={i}>
              {data.length === i ? (
                <div className="w-[5%] border py-2 rounded-tl">
                  <p className="text-center text-sm sm:text-base">{i + 1}</p>
                </div>
              ) : (
                <div className="w-[5%] border py-2">
                  <p className="text-center text-sm sm:text-base">{i + 1}</p>
                </div>
              )}
              <div className="w-[20%] border p-2">
                <Link
                  to={`/book/${data.book._id}`}
                  className="text-center hover:text-blue-300 text-sm sm:text-base"
                >
                  {data.book.title}
                </Link>
              </div>
              <div className="w-[15%] border py-2">
                <p className="text-center text-sm sm:text-base">{data.user.username}</p>
              </div>
              <div className="w-[15%] border py-2">
                <p className="text-center text-sm sm:text-base">{data.user.address}</p>
              </div>
              <div className="w-[15%] border py-2">
                <p className="text-center text-sm sm:text-base">
                  {new Date(data.updatedAt)
                    .toLocaleString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })
                    .replace(",", "")}
                </p>
              </div>
              <div className="w-[10%] border py-2">
                <p className="text-center text-sm sm:text-base">$ {data.book.price}</p>
              </div>
              <div className="w-[20%] border py-2">
                {data.status === "Order placed" ? (
                  <p className="text-center text-sm sm:text-base text-yellow-500">{data.status}</p>
                ) : data.status === "Canceled" ? (
                  <p className="text-center text-sm sm:text-base text-red-500">{data.status}</p>
                ) : (
                  <p className="text-center text-sm sm:text-base text-green-500">{data.status}</p>
                )}
                <div className="flex gap-1 p-1">
                  <select
                    name="status"
                    id=""
                    className="w-full text-sm sm:text-base  bg-zinc-800 rounded"
                    onChange={(e) => {
                      setStatus(e.target.value)
                      setUserId(data._id)
                    }}                 
                    selected={data.status}
                  >
                    {[
                      "Order placed",
                      "Out for delivery",
                      "Delivered",
                      "Canceled",
                    ].map((item, i) => (
                      <option
                        value={item}
                        key={i}
                        className="text-white text-sm sm:text-base"
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={updateStatus}
                    className="border p-1 rounded text-white bg-green-500"
                  >
                    <FaCheck />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div>
            <Pagination totalPosts={data.length} postsPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
          </div>
        </div>
      )}
    </>
  );
}
