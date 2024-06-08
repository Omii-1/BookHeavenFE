import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { Loader } from "../components/Loader/Loader"

export function UpdateBook() {
  const [book, setBook] = useState([])
  const[loader, setLoader] = useState(true)
  const {id} = useParams()
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate()


  useEffect(()=>{
    axios.get(`${backendUrl}/book/${id}`)
    .then(res => {
      setBook(res.data.book)
      setLoader(false)
    })
    .catch(err => {
      console.log(err);
    })
  },[])

  const change = (e) => {
    const {name, value} = e.target 
    setBook({...book, [name]: value})
  }

  const update = async () => {
    try {
      if(book.url ===  "" ||
        book.title === "" ||
        book.author === "" ||
        book.desc === ""|| 
        book.language === "" ||
        book.price === ""){
          alert("Fields are empty")
        } else {
          const res = await axios.put(`${backendUrl}/update-book`, book , {
            headers: {
              id: localStorage.getItem("id"),
              Authorization: localStorage.getItem("token"),
              bookid: id
            }
          })
          alert(res.data.msg);
          navigate(`/book/${id}`)
        }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    {
      loader && (
        <div>
          <Loader />
        </div>
      )
    }
    <div className="bg-zinc-900 p-4">
      <h1 className="text-6xl font-semibold text-zinc-400  ">Update Book</h1>
      <div className="bg-zinc-800 flex flex-col gap-4 rounded mt-4">
        <div className="p-4 flex flex-col gap-2">     
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-2xl font-semibold text-white">URL of Image</label>
            <input placeholder="Enter the URL" className="bg-zinc-900 p-2 rounded text-xl text-zinc-400" name="url" type="text" value={book.url} onChange={change}/>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-2xl font-semibold text-white" htmlFor="">Title</label>
            <input placeholder="Enter the Title" className="bg-zinc-900 p-2 text-zinc-400 rounded text-xl" name="title" type="text" value={book.title} onChange={change}/>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-2xl font-semibold text-white" htmlFor="">Author Name</label>
            <input placeholder="Enter the Author Name" className="bg-zinc-900 p-2 text-zinc-400 rounded text-xl" name="author" type="text" value={book.author} onChange={change} />
          </div>
          <div className="flex justify-between md:gap-6">
            <div className="w-1/3 sm:w-1/2 flex flex-col gap-2">
              <label className="text-2xl font-semibold text-white" htmlFor="">Language</label>
              <input placeholder="Enter the Language" className="bg-zinc-900 p-2 text-zinc-400 rounded text-xl" name="language" type="text" value={book.language} onChange={change} />
            </div>
            <div className="w-1/3 sm:w-1/2 flex flex-col gap-2">
              <label className="text-2xl font-semibold text-white" htmlFor="">Price</label>
              <input placeholder="Enter the Price" className="bg-zinc-900 text-zinc-400 p-2 rounded text-xl" name="price" type="text" value={book.price} onChange={change} />
            </div>
          </div>
          <div className="flex flex-col gap-2 pb-2">
            <label className="text-2xl font-semibold text-white" htmlFor="">Description</label>
            <textarea placeholder="Enter the Description" className="bg-zinc-900 text-zinc-400 p-2 rounded text-xl" name="desc" rows="4" id="" value={book.desc} onChange={change}></textarea>
          </div>
          <button onClick={update} className="bg-yellow-500 hover:bg-white hover:text-black text-white rounded p-2 text-2xl font-bold w-1/3">
            Update
          </button>
        </div>
      </div>   
    </div>
    </>
  )
}
