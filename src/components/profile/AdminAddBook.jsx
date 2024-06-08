import { useState } from "react"
import axios from "axios"

export function AdminAddBook() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [book, setBook] = useState({
    url: "",
    title:"",
    author:"",
    desc:"",
    language:"",
    price:""
  })

  const change = (e) => {
    const {name, value} = e.target 
    setBook({...book, [name]: value})
  }

  const submit = async () => {
    try{
      if(book.url ===  "" ||
        book.title === "" ||
        book.author === "" ||
        book.desc === ""|| 
        book.language === "" ||
        book.price === ""){
          alert("Fill all the Inputs")
      }else{
        const res = await axios.post(`${backendUrl}/add-book`, book ,{
          headers: {
            id: localStorage.getItem("id"),
            Authorization: localStorage.getItem("token")
          }
        })
        alert(res.data.msg)
        setBook({
          url: "",
          title:"",
          author:"",
          desc:"",
          language:"",
          price:""
        })
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <h1 className="text-6xl font-semibold text-zinc-400  pb-4">Add Book</h1>
      <div className="bg-zinc-800 flex flex-col gap-4 rounded ">
        <div className="p-4 flex flex-col gap-2">     
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-2xl font-semibold">URL of Image</label>
            <input placeholder="Enter the URL" className="bg-zinc-900 p-2 rounded text-xl" name="url" type="text" value={book.url} onChange={change}/>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-2xl font-semibold" htmlFor="">Title</label>
            <input placeholder="Enter the Title" className="bg-zinc-900 p-2 rounded text-xl" name="title" type="text" value={book.title} onChange={change}/>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-2xl font-semibold" htmlFor="">Author Name</label>
            <input placeholder="Enter the Author Name" className="bg-zinc-900 p-2 rounded text-xl" name="author" type="text" value={book.author} onChange={change} />
          </div>
          <div className="flex justify-between md:gap-6">
            <div className="w-1/3 sm:w-1/2 flex flex-col gap-2">
              <label className="text-2xl font-semibold" htmlFor="">Language</label>
              <input placeholder="Enter the Language" className="bg-zinc-900 p-2 rounded text-xl" name="language" type="text" value={book.language} onChange={change} />
            </div>
            <div className="w-1/3 sm:w-1/2 flex flex-col gap-2">
              <label className="text-2xl font-semibold" htmlFor="">Price</label>
              <input placeholder="Enter the Price" className="bg-zinc-900 p-2 rounded text-xl" name="price" type="text" value={book.price} onChange={change} />
            </div>
          </div>
          <div className="flex flex-col gap-2 pb-2">
            <label className="text-2xl font-semibold" htmlFor="">Description</label>
            <textarea placeholder="Enter the Description" className="bg-zinc-900 p-2 rounded text-xl" name="desc" rows="4" id="" value={book.desc} onChange={change}></textarea>
          </div>
          <button onClick={submit} className="bg-yellow-500 hover:bg-white hover:text-black rounded p-2 text-2xl font-bold w-1/3">
            Submit
          </button>
        </div>
      </div>   
    </>
  )
}
