import { Loader } from "../components/Loader/Loader"
import axios from "axios"
import { useEffect, useState } from "react"
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  const fetchCart = async () => {
    try{
      const response =  await axios.get(`${backendUrl}/cart-books`,{
        headers:{
          id: localStorage.getItem("id"),
          Authorization: localStorage.getItem("token")
        }
      })
      setCart(response.data.cart || [])
    }catch(err){
      console.error("Error fetching cart: ", err)
      setCart([])
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchCart()
  },[])

  const deleteItem = async (bookId) => {
    const response = await axios.put(`${backendUrl}/remove-cart/${bookId}`,{},{
      headers:{
        id: localStorage.getItem("id"),
        Authorization: localStorage.getItem("token")
      }
    })
    alert(response.data.msg);
    fetchCart()
  } 

  useEffect(()=>{
    if (cart && cart.length > 0){
      let Total = 0
      cart.map((items) => {
        Total += parseFloat(items.price)
      })
      setTotal(Total)
      Total = 0
    }
  }, [cart])

  const placeOrder = async () => {
    try{
      const response = await axios.post(`${backendUrl}/place-order`, {
        order: cart
      },{
        headers:{
          id : localStorage.getItem("id"),
          Authorization: localStorage.getItem("token")
        }
      })
      console.log(response);
      navigate("/profile/orderHistory")
    } catch(err){
      console.log(err);
    }
  }
  
  return (
    <div className="bg-zinc-900 sm:px-12 px-4 lg:px-40 min-h-[84vh]  py-8 ">
      {loading && (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!loading && cart.length === 0 && (
        <div className="min-h-[83vh] flex justify-center items-center flex-col">
          <h1 className="font-semibold text-white text-2xl sm:text-3xl">Empty cart</h1>
          <img src="" alt="image" />
        </div>
        )}
      {!loading && cart.length > 0 && (
        <div className="min-h-[83vh]">
          <h1 className="text-4xl font-semibold text-zinc-300  py-5 border-b border-zinc-500">Your cart</h1>
          {cart && cart.map( (data, i) => (
            <div key={i} className="flex border-b border-zinc-500 py-2">
              <div className="w-1/3 p-1 flex justify-center">
                <img className="h-20 sm:h-36 rounded-md" src={data.url} alt={data.title} />
              </div>
              <div className="flex justify-between items-center w-2/3">
                <div className="w-1/2">
                  <h1 className="text-white text-base sm:text-2xl font-semibold">{data.title}</h1>
                  <p className="text-zinc-600 text-sm sm:text-base">{data.author}</p>
                </div>
                <div className="flex w-1/2 justify-around">
                  <p className="text-zinc-300 font-semibold text-lg sm:text-2xl">$ {data.price}</p>
                  <button onClick={() => deleteItem(data._id)} className="border rounded p-1 hover:bg-red-600 bg-white hover:text-white text-red-600 sm:h-10 h-8"><RiDeleteBin6Line className="text-2xl sm:4xl" /></button>       
                </div>
              </div>
            </div>
            )
          )}
          <div>
            <div className="flex justify-between lg:justify-around items-center p-4">
              <h1 className="font-semibold text-zinc-300 text-xl sm:text-3xl">
                Total
              </h1>
              <p className="text-zinc-400 font-semibold text-sm sm:text-xl">
                {cart.length} Books
              </p>
              <h1 className="text-white font-semibold text-xl sm:text-3xl">
                $ {(total).toFixed(2)}
              </h1>
            </div>
            <button onClick={placeOrder} className="p-2 sm:p-4 text-center w-full bg-zinc-800 rounded-md text-white font-semibold text-xl sm:text-2xl shadow hover:text-black hover:bg-white transition-all duration-300">Proceed to Checkout</button>
          </div>
        </div>
        )
      }
    </div>
  )
}
