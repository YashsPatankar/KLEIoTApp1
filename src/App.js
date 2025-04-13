import { useState } from "react";
import { BrowserRouter} from "react-router-dom";
import "./App.css";
import Chairman from "./components/Chairman";
import Secretary from "./components/Secretary";
import Owner from "./components/Owner";
import Security from "./components/Security";
import AdminDashboard from "./components/AdminDashboard";
import Home from "./components/Home";

function App() 
{
  const [loginStatus, setLoginStatus] = useState(false);
  const [login,setLogin]=useState("")
  const [userType, setUserType] = useState("");
  const [oid, setOid] = useState()
  const [firstTime, setFirstTime] = useState(true);
  const [username, setUsername] = useState("");
  const handleLogout = () => {
    setLoginStatus(false);
    setUserType("");
    setUsername("");
  };
  return (
    <div className="App">
      {!loginStatus ? 
      (
        <Home
          firstTime={firstTime}
          setFirstTime={setFirstTime}
          setOid={setOid}
          oid={oid}
          setLoginStatus={setLoginStatus}
          setUserType={setUserType}
          setUsername={setUsername}
          setLogin={setLogin} />
      ) : userType === "Admin" ? 
      (
        <AdminDashboard setLoginStatus={setLoginStatus} />
      ) : userType === "Chairman" ? 
      (
        <BrowserRouter>
        <Chairman setLoginStatus={setLoginStatus} /></BrowserRouter>
      ) : userType === "Secretary" ? 
      (
        <Secretary setLoginStatus={setLoginStatus} />
      ) : userType === "Owner" ? 
      (
        <div>
          {/* Header Section */}
          <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, <span className="text-blue-500">{username || "Owner"}!</span>
            </h1>
            <button
              className="bg-blue-400 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </header>
          <Owner username={username} setLoginStatus={setLoginStatus} oid={oid} login={login}/>
        </div>
      ) : 
      (
        <Security setLoginStatus={setLoginStatus} />
      )}
    </div>
  );
}

export default App;