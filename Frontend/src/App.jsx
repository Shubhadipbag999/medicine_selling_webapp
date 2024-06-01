import './App.css'
import NavBar from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Medicines from './pages/Medicines';
import ParentsCare from './pages/ParentsCare';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Medicine from './pages/Medicine';
import AddNewProduct from './pages/AddNewProduct';
import LoginSignup from './pages/LoginSignup';
import Profile from './pages/Profile';
// import Notfound from './pages/Notfound';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShopByCatagory from './pages/ShopByCatagory';
import Orderbycatagory from './pages/Orderbycatagory'
import Manageuser from './pages/Manageuser';
import Offers from './pages/Offers';
import Offerforyou from './pages/Offerforyou';
import Searchbyname from './pages/Searchbyname';


function App() {
  return (
    <>
      <div className='mainDiv'>

        <NavBar />
        <Routes>
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/' exact element={<Home />} />
          <Route path='/medicines' element={<Medicines />} >

          </Route>
          <Route path='/medicine/:productId' element={<Medicine />} />
          <Route path='/medicines/:catagoryData' element={<Orderbycatagory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/parentscare' element={<ParentsCare />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/about' element={<About />} />
          <Route path="/admin/addproduct" element={<AddNewProduct />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/medicines/bycatagory" element={<ShopByCatagory />} />
          <Route path="/admin/manageusers" element={<Manageuser />}></Route>
          <Route path="/medicines/medicineoffer" element={<Offers />} />
          <Route path="/medicines/offersforyou" element={<Offerforyou />} />
          <Route path="/searchbyname" element={<Searchbyname />} />
          {/* <Route element={<Notfound />}>
          </Route> */}
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"></ToastContainer>

      </div>
    </>
  )
}

export default App
