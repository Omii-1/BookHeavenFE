import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { authActions } from "../store/auth";
import {useDispatch} from "react-redux"

export function SignInUp({ name }) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault()
    try {
      if (name === "signup" ?
      values.username === "" ||
      values.email === "" ||
      values.password === "" ||
      values.address === "" :
      values.email === "" ||
      values.password === ""
    ) {
        alert("Fill all values");
      } else {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/${name}`, values)
        console.log(res.data.msg);
        dispatch(authActions.login())
        dispatch(authActions.changeRole(res.data.role))
        localStorage.setItem("id", res.data.id)
        localStorage.setItem("token", `Bearer ${res.data.token}`)
        localStorage.setItem("role", res.data.role)
        navigate("/")
      }
    } catch (err) {
      alert(err.response.data.msg);
      const path = name === "signup" ? "/signup" : "/signin"
      navigate(path)
    }
  };
  
  return (
    <>
      <div className="bg-zinc-900 h-[84vh] sm:h-[82vh] flex items-center justify-center">
        <div className="bg-zinc-800 p-6 rounded flex flex-col gap-3 w-[90%] sm:w-[50%] md:w-[40%] lg:w-[30%] shadow-lg">
          <h1 className="text-3xl font-bold text-center text-zinc-400">
            {name === "signup" ? "Sign Up" : "Login"}
          </h1>
          <form onSubmit={submit} className="flex flex-col gap-2">
            {name === "signup" && (
              <div className="flex flex-col gap-1">
                <label className="text-zinc-500 text-xl" htmlFor="">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  value={values.username}
                  onChange={change}
                  autoComplete="current-password"
                  className="px-2 py-2 bg-zinc-900 rounded outline-none text-white"
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label className="text-zinc-500 text-xl" htmlFor="">
                Email
              </label>
              <input
                className="px-2 py-2 bg-zinc-900 rounded outline-none text-white"
                placeholder="user@gmail.com"
                type="text"
                value={values.email}
                name="email"
                autoComplete="current-password"
                onChange={change}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-zinc-500 text-xl" htmlFor="">
                Password
              </label>
              <input
                className="px-2 py-2 bg-zinc-900 rounded outline-none text-white"
                placeholder="password"
                type="password"
                value={values.password}
                name="password"
                onChange={change}
                autoComplete="current-password"
              />
            </div>
            {name === "signup" && (
              <div className="flex flex-col gap-2">
                <label className="text-zinc-500 text-xl" htmlFor="">
                  Address
                </label>
                <textarea
                  className="px-2 py-2 bg-zinc-900 rounded outline-none text-white"
                  name="address"
                  onChange={change}
                  value={values.address}
                  placeholder="address"
                  autoComplete="current-password"
                ></textarea>
              </div>
            )}
            <div className="flex justify-center">
              <button
                type = "submit"
                className="text-white bg-blue-500 hover:bg-blue-700 text-xl font-semibold px-3 py-1 rounded w-full text-center mt-2"
              >
                {name === "signup" ? "Sign Up" : "Login"}
              </button>
            </div>
          </form>

          <div className="flex flex-col justify-center items-center">
            <p className="text-zinc-400 text-2xl font-semibold">Or</p>
            {name === "signup" ? (
              <div className="flex gap-1">
                <p className="text-zinc-400 text-xl font-semibold">
                  Already have an account?
                </p>
                <Link
                  className="text-blue-500 text-xl hover:underline underline-offset-4 transition-all text-center"
                  to="/signin"
                >
                  Login
                </Link>
              </div>
            ) : (
              <div className="flex gap-1">
                <p className="text-zinc-400 text-xl font-semibold">
                  Create new account?
                </p>
                <Link
                  className="text-blue-500 text-xl hover:underline underline-offset-4 transition-all "
                  to="/signup"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
