import { useRef, useState, useEffect } from "react";
import useAuth from "./hooks/useAuth";
import axios from "axios";
import "./Login.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LOGIN_URL = "/api/v1/auth/authenticate";
export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let dto = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080" + LOGIN_URL,
        dto,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
      console.log(response.data);
      console.log(JSON.stringify(response));
      const accessToken = response?.data?.token;
      const role = response?.data?.role;
      const name = response?.data.name;
      console.log("Name: " + name);
      console.log("Role:" + role);
      console.log("Token:" + accessToken);
      localStorage.setItem("user_name", name);
      localStorage.setItem("role", role);
      setAuth({ email, password, accessToken, role });
      setEmail("");
      setPassword("");
      if (role === "ADMINISTRATOR") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <div>
          <button>Sign in</button>
        </div>
      </form>
      <p>
        Don't have an account?
        <br />
        <span className="line">
          <a href="/register">Sign up</a>
        </span>
      </p>
    </section>
  );
}
