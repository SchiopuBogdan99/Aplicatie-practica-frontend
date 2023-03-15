import AdminHeader from "./AdminHeader";
import { useEffect, useState } from "react";
export default function ConfigUsers() {
  const [name, setName] = useState("");
  const [initials, setInitials] = useState("");
  const getInitials = () => {
    var names = name.split(" ");
    var initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    setInitials(initials);
  };
  useEffect(() => {
    const name = localStorage.getItem("user_name");
    if (name) {
      setName(name);
    }
  }, []);
  useEffect(() => {
    getInitials();
  }, [name]);
  return (
    <div>
      <AdminHeader name={name} initials={initials} text={"Config users page"} />
    </div>
  );
}
