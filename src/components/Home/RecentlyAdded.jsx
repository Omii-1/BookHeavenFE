import axios from "axios"
import { useEffect, useState } from "react"
import {BookCard} from "../BookCard"
import { Spinner } from "@material-tailwind/react";

export function RecentlyAdded() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [data, setData] = useState([])

  useEffect(()=>{
    axios.get(`${backendUrl}/recent-books`)
    .then(res => {
      setData(res.data.books)
    })
    .catch(err => {
      console.log(err);
    })
  },[])

  return (
    <div className="py-4 mt-10 md:mt-16">
      <h1 className="text-yellow-200 text-4xl font-semibold">Recently added books</h1>
      
      {!data &&  <div className="flex justify-center items-center transition-all duration-2000"><Spinner /></div>}

      <div className="pt-6 sm:pt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {
          data && data.map((book, i) => <BookCard 
            key={i}
            id={book._id}
            image={book.url}
            title={book.title}
            author={book.author}
            price={book.price}
          />)
        }
      </div>
    </div>
  )
}
