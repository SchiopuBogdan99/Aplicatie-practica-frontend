import "./AdminHeader.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function AdminHeader({ name, initials, text }) {
  const navigate = useNavigate();
  let subMenu = document.getElementById("subMenu");
  function toggleMenu() {
    subMenu.classList.toggle("open-menu");
  }
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
        <div className="userInitials" onClick={toggleMenu}>
          <span className="dot">{initials}</span>
        </div>
        <div className="sub-menu-wrap" id="subMenu">
          <div className="sub-menu">
            <div className="user-info">
              <h2>{name}</h2>
            </div>
            <hr />
            <a
              className="sub-menu-link"
              onClick={(e) => {
                e.preventDefault();
                navigate("/cfg-user");
              }}
            >
              <p>Config utilizatori</p>
              <span>{">"}</span>
            </a>
            <a
              className="sub-menu-link"
              onClick={(e) => {
                e.preventDefault();
                navigate("/cfg-country");
              }}
            >
              <p>Config tari</p>
              <span>{">"}</span>
            </a>
            <a href="#" className="sub-menu-link" onClick={handleLogout}>
              <p>Logout</p>
              <span>{">"}</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
