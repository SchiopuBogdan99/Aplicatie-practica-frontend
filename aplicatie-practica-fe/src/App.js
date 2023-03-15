import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./Login";
import Register from "./Register";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import Demo from "./Demo";
import AdminPage from "./components/AdminPage";
import ConfigCountries from "./components/ConfigCountries";
import ConfigUsers from "./components/ConfigUsers";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      {/* public routes*/}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="demo" element={<Demo />} />
      {/* protected routes */}
      <Route element={<RequireAuth allowedRoles={["ADMINISTRATOR"]} />}>
        <Route path="admin" element={<AdminPage />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={["ADMINISTRATOR"]} />}>
        <Route path="cfg-country" element={<ConfigCountries />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={["ADMINISTRATOR"]} />}>
        <Route path="cfg-user" element={<ConfigUsers />} />
      </Route>
      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default App;
