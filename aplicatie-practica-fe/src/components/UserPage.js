import { useEffect, useState } from "react";
import UserHeader from "./UserHeader";

export default function UserPage() {
  const [user, setUser] = useState({
    name: "",
    role: "",
  });

  useEffect(() => {
    const name = localStorage.getItem("user_name");
    const role = localStorage.getItem("role");
    const user = {
      name: name,
      role: role,
    };
    if (name) {
      setUser(user);
    }
  }, []);
  return (
    <div>
      <UserHeader
        text={"Welcome user " + user.name + "! " + "Current role: " + user.role}
      />
    </div>
  );
}
