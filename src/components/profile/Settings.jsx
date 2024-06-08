import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../Loader/Loader";

export function Settings() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: localStorage.getItem("token"),
  };
  const [value, setValue] = useState({ address: "" });
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${backendUrl}/user-info`, { headers });
      setProfile(res.data.userInfo)
      setValue({ address: res.data.userInfo.address });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const change = (e) => {
    const {name, value} = e.target
    setValue((preVal) => ({...preVal, [name]: value}))
  }

  const changeAdd = async () => {
    try {
      const res = await axios.put(`${backendUrl}/update-address`,{address: value.address},{headers})
      alert(res.data.msg);    
    } catch (error) {
      console.error("error:" + error )
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {loading && (
        <div>
          <Loader />
        </div>
      )}
      <div className="min-h-[60vh]">
        <h1 className="text-4xl sm:text-6xl font-semibold text-zinc-500 lg:py-8 py-4 pt-0">Settings</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3">
            <div className="flex gap-4 text-xl sm:text-2xl">
              <label htmlFor="" className="text-zinc-400">Username :</label>
              <p>{profile.username}</p>
            </div>
            <div className="flex gap-4 text-xl sm:text-2xl">
              <label htmlFor="" className="text-zinc-400">Email :</label>
              <p>{profile.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="address" className=" text-xl sm:text-2xl text-zinc-400">
              Address :
            </label>
            <textarea
              className="rounded bg-zinc-800 p-1 text-xl"
              name="address"
              id=""
              placeholder={value}
              value={value.address}
              rows="5"
              onChange={change}
            ></textarea>
            <div className="flex justify-end pt-1">
              <button onClick={changeAdd} className="text-xl px-4 py-2 rounded bg-yellow-500 text-white hover:bg-white hover:text-black font-semibold shadow ">Update</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
