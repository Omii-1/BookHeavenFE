import axios from "axios"
import {BookCard} from "../BookCard"
import { useEffect, useState } from "react"
import { Loader } from "../Loader/Loader"
import { Pagination } from "../Pagination";

export function Favourites() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const[books, setBooks] = useState([])
  const[loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(6)

  const fetchFav = async () => {
    try{
      const response = await axios.get(`${backendUrl}/fav-books`,{
        headers:{
          id: localStorage.getItem("id"),
          Authorization: localStorage.getItem("token")
        }
      })
      setBooks(response.data.books)
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false)
    }
  }

  const handleDelete = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
  };

  useEffect(()=> {
    fetchFav()   
  },[])

  const lastPostIndex =  currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentPosts = books.slice(firstPostIndex, lastPostIndex)

  return (
    <>
      {loading && (
        <div className="h-[100%] flex items-center">
          <Loader/>
        </div>
      )}
      {!loading && books.length === 0 &&(
        <div className="w-full h-[45vh] flex justify-center items-center">
          <h1 className="text-4xl font-bold text-zinc-500">Favourites is Empty</h1>
        </div>
      )}
      {!loading && books.length != 0 && (
        <div className="w-full min-h-[55vh]">
          <h1 className="font-semibold text-4xl sm:text-6xl text-zinc-400 pb-5">Favourites</h1>
          <div className="w-full grid lg:grid-cols-3 grid-cols-2 gap-6 justify-items-center">
          {currentPosts && currentPosts.map((book, i) => 
            <div key={i}>
              <BookCard 
                id={book._id}
                image={book.url}
                title={book.title}
                author={book.author}
                price={book.price}
                favourite = {true}
                onDelete = {handleDelete}
              />        
            </div>
          )}
          </div>
          <div>
            <Pagination totalPosts={books.length} postsPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
          </div>
        </div>
      )}
    </>
  )
}
