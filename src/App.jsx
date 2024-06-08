import {Home} from "./pages/Home"
import { AllBooks } from "./pages/AllBooks"
import { Book } from "./pages/Book"
import {Signin} from "./pages/Signin"
import {Signup} from "./pages/Signup"
import {Navbar} from "./components/Navbar"
import {Footer} from "./components/Footer"
import { Profile } from "./pages/Profile"
import {Favourites} from "./components/profile/Favourites"
import {OrderHistory} from "./components/profile/OrderHistory"
import {AdminAllOrder} from "./components/profile/AdminAllOrder"
import {AdminAddBook} from "./components/profile/AdminAddBook"
import {UpdateBook} from "./pages/UpdateBook"
import {Cart} from "./pages/Cart"
import {Settings} from "./components/profile/Settings"
import {Routes, Route} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "./store/auth"
import { useEffect } from "react"

function App() {
  const dispatch = useDispatch()
  const role = useSelector((state) => state.auth.role)

  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role")){
      dispatch(authActions.login())
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }
  }, [])
  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route  path="/all-books" element={<AllBooks />}/>
        <Route  path="/book/:id" element={<Book />} />
        <Route  path="/signin" element={<Signin/>} />
        <Route  path="/signup" element={<Signup/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/updateBook/:id" element={<UpdateBook/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route  path="/profile" element={<Profile/>} >
          {
            role === "user" ? <>
              <Route index element={<Favourites />} />
              <Route path="/profile/orderHistory" element={<OrderHistory />} />
              <Route path="/profile/settings" element={<Settings />} /> 
            </> : <>
              <Route index element= {<AdminAllOrder />}/>
              <Route path="/profile/adminAddBook" element={<AdminAddBook />} />
            </>
          }
        </Route>
      </Routes>
      <Footer />
    </div>

  )
}

export default App
