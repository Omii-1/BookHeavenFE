import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";
import { Link } from "react-router-dom";
import { Pagination } from "../Pagination";

export function OrderHistory() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(10)

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${backendUrl}/get-order-history`, {
        headers: {
          id: localStorage.getItem("id"),
          Authorization: localStorage.getItem("token"),
        },
      });
      setOrder(res.data.data);
      console.log(order);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const lastPostIndex =  currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentPosts = order.slice(firstPostIndex, lastPostIndex)

  return (
    <div>
      {loading && (
        <div className="h-[100%}">
          <Loader />
        </div>
      )}
      {!loading && order.length === 0 && (
        <div className="w-full h-[45vh] flex justify-center items-center">
          <h1 className="text-4xl font-bold text-zinc-500">Order History is Empty</h1>
        </div>
      )}
      {!loading && order.length > 0 && (
        <div className="flex flex-col">
          <h1 className="py-4 text-4xl sm:text-6xl font-semibold text-zinc-500">
            Your Order History
          </h1>
          <div className="flex">
            <div className="w-[5%] border rounded-tl py-2 bg-zinc-800">
              <p className="text-center font-bold ">Sr.</p>
            </div>
            <div className="w-[30%] border py-2 bg-zinc-800">
              <p className="text-center font-bold">Books</p>
            </div>
            <div className="w-[20%] border py-2 bg-zinc-800">
              <p className="text-center font-bold">Date</p>
            </div>
            <div className="w-[15%] border py-2 bg-zinc-800">
              <p className="text-center font-bold">Price</p>
            </div>
            <div className="w-[20%] border py-2 bg-zinc-800">
              <p className="text-center font-bold">Status</p>
            </div>
            <div className="w-[10%] border py-2 bg-zinc-800 rounded-tr">
              <p className="text-center font-bold ">Mode</p>
            </div>
          </div>

          {currentPosts.map((data, i) => (
            <div className="flex" key={i}>
              {order.length === i ? (
                <div className="w-[5%] border py-2 rounded-tl">
                  <p className="text-center">{firstPostIndex + i + 1}</p>
                </div>
              ) : (
                <div className="w-[5%] border py-2">
                  <p className="text-center">{firstPostIndex + i + 1}</p>
                </div>
              )}
              <div className="w-[30%] border p-2">
                <Link
                  to={`/book/${data.book._id}`}
                  className="text-center hover:text-blue-300 "
                >
                  {data.book.title}
                </Link>
              </div>
              <div className="w-[20%] border py-2">
                <p className="text-center">
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
              <div className="w-[15%] border py-2">
                <p className="text-center">$ {data.book.price}</p>
              </div>
              <div className="w-[20%] border py-2">
                {data.status === "Canceled" ? (
                  <p className="text-center text-red-500">{data.status}</p>
                ) : (
                  <p className="text-center text-green-500">{data.status}</p>
                )}
              </div>
              {order.length === i ? (
                <div className="w-[10%] border py-2 rounded-tr">
                  <p className="text-center ">COD</p>
                </div>
              ) : (
                <div className="w-[10%] border py-2">
                  <p className="text-center ">COD</p>
                </div>
              )}
            </div>
          ))}
          <div>
            <Pagination totalPosts={order.length} postsPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
          </div>
        </div>
      )}
    </div>
  );
}
