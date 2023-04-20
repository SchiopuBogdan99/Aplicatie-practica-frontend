import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  return (
    <main className="App">
      <Outlet />
      <h1>Hello</h1>
      <a href="/login">Go to login</a>
      <hr></hr>
      <a href="/register">Go to register</a>
    </main>
  );
}
