import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddActivity from "./components/AddActivity";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import ActivityProfile from "./components/ActivityProfile";
import SearchActivities from "./components/SearchActivities";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<><Navbar/> <Dashboard/> <Footer/></>} />
          <Route path="/addActivity" element={<><Navbar/><AddActivity/><Footer/></>} />
          <Route path="/activityProfile/:activityId" element={<><Navbar/><ActivityProfile/><Footer/></>} />
          <Route path="/searchActivities" element={<><Navbar/> <SearchActivities/> <Footer/></>} />
            {/* <Navbar/>
            <Dashboard/>
          </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;