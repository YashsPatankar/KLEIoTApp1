import { useState } from "react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import Chairman from "./components/Chairman";
import Secretary from "./components/Secretary";
import Owner from "./components/Owner";
import Security from "./components/Security";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("")
  const handleLogout = () => {
    setLoginStatus(false);
    setUserType("");
  };
  return (
    <div className="App">

      {!loginStatus ? (
        <LoginPage setUsername={setUsername} setLoginStatus={setLoginStatus} setUserType={setUserType} />
      ) : userType === "Admin" ? <AdminDashboard setLoginStatus={setLoginStatus} /> : userType === "Chairman" ? <Chairman setLoginStatus={setLoginStatus} />
        : userType === "Secretary" ? <Secretary setLoginStatus={setLoginStatus} /> : userType === "Owner" ?
          <Owner username={username} setLoginStatus={setLoginStatus} /> : <Security setLoginStatus={setLoginStatus} />}
    </div>

  )
}
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f4f4f4",
    borderBottom: "1px solid #ddd",
  },
  logoutButton: {
    padding: "10px 15px",
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;
