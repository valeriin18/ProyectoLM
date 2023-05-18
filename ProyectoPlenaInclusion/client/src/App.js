import { BrowserRouter, Route, Routes } from "react-router-dom";
// import AddActivity from "./components/AddActivity";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
// import Navbar from "./components/Navbar";
import Register from "./components/Register";
// import ActivityProfile from "./components/ActivityProfile";
//import SearchActivities from "./components/SearchActivities";
import { Navigate } from 'react-router-dom';
import  Navbar  from "./components/Navbar";
import Profile from "./components/Profile";
import Activities from "./components/Activities";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<><Navbar /><Dashboard/> </>} />
          <Route path="/register" element={<><Navbar /><Register/> </>} />
          <Route path="/profile" element={<><Navbar /><Profile/> </>} />
          <Route path="/Activities" element={<><Navbar /><Activities/> </>} />
          {/* <Route path="/addActivity" element={<><Navbar/><AddActivity/><Footer/></>} />
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