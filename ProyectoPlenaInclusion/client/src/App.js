import { BrowserRouter, Route, Routes } from "react-router-dom";
// import AddActivity from "./components/AddActivity";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Login from "./components/Login";
// import Navbar from "./components/Navbar";
// import Register from "./components/Register";
// import ActivityProfile from "./components/ActivityProfile";
//import SearchActivities from "./components/SearchActivities";
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<><Dashboard/> </>} />
          {/* <Route path="/register" element={<Register/>} />
          <Route path="/addActivity" element={<><Navbar/><AddActivity/><Footer/></>} />
          <Route path="/activityProfile/:activityId" element={<><Navbar/><ActivityProfile/><Footer/></>} />
          <Route path="/searchActivities" element={<><Navbar/> <SearchActivities/> <Footer/></>} />
          <Route path='*' element={<Navigate to = '/login' />} />*/}
          <Route path='*' element={<Navigate to = '/login' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;