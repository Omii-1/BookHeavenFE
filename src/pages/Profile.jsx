import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/profile/Sidebar"
import { useEffect, useState } from "react"
import axios from "axios"

export function Profile() {
  // const isLoggedIn = useSelector()
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [profile, setProfile] = useState([])

  useEffect(()=>{
      const fetch = async () => {
        const info = await axios.get(`${backendUrl}/user-info`,{
          headers:{
            id: localStorage.getItem("id"),
            Authorization: localStorage.getItem("token")
          }
        })
        .then( res => res.data.userInfo)
        setProfile(info);
        console.log(profile);
      }
      fetch()
    }, [])

  return (
    <div className="min-h-[84vh]">
      {profile && (
        <div className="bg-zinc-900 h-auto flex flex-col lg:flex-row px-4 md:px-12 py-8 gap-4 w-full">
          <div className="w-full lg:w-1/6 h-2/6 md:h-full text-white ">
            <Sidebar data={profile} />
          </div>
          <div className="w-full lg:w-5/6 h-4/6 text-white">
            <Outlet/>
          </div>
        </div>
      )}
    </div>
  )
}
