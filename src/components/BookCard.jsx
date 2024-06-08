import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios"

export function BookCard({id, image, title, author, price, favourite, onDelete}) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const deleteFav = async () => {
    const response = await axios.put(`${backendUrl}/remove-fav`,{
      bookid: id, 
      id: localStorage.getItem("id")
    }, 
    {
      headers:{
        Authorization: localStorage.getItem("token")
    }})
    alert(response.data.msg);
    onDelete(id)
  }

  return (
    <div className="w-[150px] sm:w-[300px] bg-zinc-800 hover:bg-zinc-700  rounded-lg p-2 sm:p-4 flex flex-col gap-2 hover:shadow-xl shadow-lg transition-all duration-300">
      <Link to={`/book/${id}`} >
        <div className="bg-zinc-900 rounded flex justify-center items-center">
          <img className="h-[20vh] sm:h-[35vh] py-2" src={image} alt="book_image" />
        </div>
        <h1 className="text-center font-bold text-base sm:text-xl text-zinc-200">{title}</h1>
        <p className="text-base sm:text-lg font-semibold text-zinc-500">by {author}</p>
      </Link>
      <div className="flex justify-between">
        <p className="text-base sm:text-lg font-semibold text-zinc-300">{price} $</p>
        {favourite && (
          <button className="border rounded p-1 hover:bg-red-600 bg-white hover:text-white text-red-600" onClick={deleteFav}><RiDeleteBin6Line size={20} /></button>       
        )}
      </div>  
    </div>
  )
}
