import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import {Loader} from "../components/Loader/Loader"
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux"


export function Book() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [data, setData] = useState([])
  const[loader, setLoader] = useState(true)
  const {id} = useParams()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const role = useSelector((state) => state.auth.role)
  const navigate = useNavigate()

  useEffect(()=>{
    axios.get(`${backendUrl}/book/${id}`)
    .then(res => {
      setData(res.data.book)
      setLoader(false)
    })
    .catch(err => {
      console.log(err);
    })
  },[])

  const handleFavourite = async () => {
    const response = await axios.put(`${backendUrl}/add-fav`,
    {
      bookid: id,
      id: localStorage.getItem("id")
    },
    {
      headers:{
        Authorization: localStorage.getItem("token")
      }     
    })
    alert(response.data.msg)    
  }

  const handleCart = async() => {
    const response = await axios.put(`${backendUrl}/add-cart`,{
      bookid: id,
      id: localStorage.getItem("id")
    },{
      headers:{
        Authorization: localStorage.getItem("token")
      }
    })
    alert(response.data.msg);
  }

  const deleteBook = async () => {
    try{
      const res = await axios.delete(`${backendUrl}/delete-book`,{
        headers: {
          id: localStorage.getItem("id"),
          Authorization: localStorage.getItem("token"),
          bookid: data._id
        }
      })
      alert(res.data.msg);
      navigate("/all-books")
    }catch(err){
      console.log(err)
    }
  }

  if(loader){
    return(
      <div className="h-[90vh] bg-zinc-900 w-full flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-4 lg:gap-8 bg-zinc-900 px-4 md:px-12 py-8 md:items-start items-center ">
      <div className="w-full sm:w-1/2 md:w-2/5 flex justify-center">
        <div className="flex justify-start lg:justify-around bg-zinc-800 p-4 lg:p-8 rounded flex-col lg:flex-row gap-8 lg:gap-4 w-2/3 sm:w-full">
          <img src={data.url} className="rounded h-[30vh] sm:h-[52vh] lg:h-[70vh] object-contain" alt="" />
          {isLoggedIn == true && role == "user" && (
            <div className="flex flex-row lg:flex-col gap-4 justify-center lg:justify-start">
              <button onClick={handleFavourite} className="bg-red-500 hover:bg-white rounded-full text-3xl p-2 text-white hover:text-red-500 transition-all duration-500">
                <FaHeart />
              </button>
              <button onClick={handleCart} className="bg-blue-500 hover:bg-white rounded-full text-3xl p-2 text-white hover:text-blue-500 transition-all duration-300">
                <FaShoppingCart />
              </button>
            </div>
          )}
          {isLoggedIn == true && role == "admin" && (
            <div className="flex flex-row lg:flex-col gap-4 justify-center lg:justify-start">
              <Link to={`/updateBook/${id}`}  className="bg-white hover:bg-black rounded-full text-2xl p-3 text-black hover:text-white transition-all duration-500">
                <FaEdit />
              </Link>
              <button onClick={deleteBook} className="bg-white hover:bg-red-500 rounded-full text-3xl p-2 text-red-500 hover:text-white transition-all duration-300">
                <MdDeleteOutline />
              </button>
          </div>
          )}
        </div>
      </div>
      <div className="p-0 md:p-4 w-full md:w-3/5 flex flex-col gap-4">
        <h1 className="text-4xl text-zinc-300 font-semibold text-center">{data.title}</h1>
        <p className="text-zinc-400">by {data.author}</p>
        <p className="flex items-center justify-start gap-2 text-zinc-400">
          <GrLanguage />{data.language}
        </p>
        <p className="text-zinc-100 text-3xl font-semibold">Price: {data.price} $</p>
        <p className="text-zinc-500 text-xl">{data.desc}</p>
      </div>
    </div>
  )
}
