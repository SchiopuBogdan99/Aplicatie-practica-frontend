import "./AdminHeader.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserHeader({ text }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      axios.options("/api/v1/auth/logout").then((response) => {
        navigate("/login");
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="header">
      <nav className="nav">
        <div className="welcomeMessage">
          <h1>{text}</h1>
        </div>
        <div>
          <a href="#" className="sub-menu-link" onClick={handleLogout}>
            <p>Logout</p>
          </a>
        </div>
      </nav>
    </div>
  );
}
