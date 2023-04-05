// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,  Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCars from './pages/BookingCars';
import 'antd/dist/antd.css';
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';
import Protect from './pages/Protect';
import About from './pages/About';


function App() {
  
  
  return (
    <div className="App">
    
      <Router>
        <Routes>
         
          <Route path="/" exact element={<Protect> <Home /></Protect>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking/:carid"  element={<BookingCars/>} />
          <Route path="/userbookings"  element={<UserBookings/>} />
          <Route path="/addcar"  element={<AddCar/>} />
          <Route path="/admin"  element={<AdminHome/>} />
          <Route path='/about' element={<About/>}/>
          <Route path="/editcar/:carid"  element={<EditCar/>} />
        </Routes>
      </Router>
    </div>
  );
  
  
}
export default App;

