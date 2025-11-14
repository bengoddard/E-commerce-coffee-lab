import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import CoffeeList from "./pages/CoffeeList"
import CoffeeCard from "./pages/CoffeeCard"
import CoffeeForm from "./pages/CoffeeForm"
import Login from "./pages/Login"
import AdminPortal from "./pages/AdminPortal"
import AdminCoffeeList from "./pages/AdminCoffeeList"
import AdminRoute from "./components/AdminRoute"
import ErrorPage from "./pages/ErrorPage"

function App(){
  const user = JSON.parse(localStorage.getItem("user"));

  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/shop" element={<Shop/>}>
          <Route index element={<CoffeeList />} />
          <Route path=":id" element={<CoffeeCard />} />
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin" element={<AdminRoute user={user}>
              <AdminPortal />
            </AdminRoute>}
          />
          <Route
            path="/admin/coffees"
            element={
              <AdminRoute user={user}>
                <AdminCoffeeList />
              </AdminRoute>
              }
          />
          <Route
            path="/admin/coffees/new"
            element={
          <AdminRoute user={user}>
          <CoffeeForm />
          </AdminRoute>
            }
          />

          <Route
            path="/admin/coffees/:id/edit"
            element={
          <AdminRoute user={user}>
          <CoffeeForm />
          </AdminRoute>
            }
          />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
