import { useState, useEffect } from "react"
import axios from "axios"
import { BookCard } from "../components/BookCard"
import { Pagination } from "../components/Pagination";
import { FaSearch } from "react-icons/fa";

export function AllBooks() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(8)

  useEffect(()=>{
    axios.get(`${backendUrl}/all-books`)
    .then(res => {
      setData(res.data.books)
    })
    .catch(err => {
      console.log(err);
    })
  },[])

  const lastPostIndex =  currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentPosts = data.slice(firstPostIndex, lastPostIndex)

  return (
    <div className="bg-zinc-900 p-4 w-full min-h-[83vh]">
      <div className='flex p-5 w-full justify-center'>
        <input className='w-[63%] lg:w-[40%] outline-none rounded-l-full p-2 px-4 shadow-md' type="text" />
        <div className='border border-zinc-600 rounded-r-full sm:w-[7%] lg:w-[4%] bg-zinc-800 hover:bg-zinc-900 cursor-pointer p-2 text-white shadow-md flex justify-center'> <FaSearch className="h-6 w-6"/></div>
      </div>

      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center">
      {
        currentPosts && currentPosts.map((book, i) => <BookCard 
          key={i}
          id={book._id}
          image={book.url}
          title={book.title}
          author={book.author}
          price={book.price}
        />)
      }
    </div>
    <div>
      <Pagination totalPosts={data.length} postsPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </div>
    </div>
  )
}
