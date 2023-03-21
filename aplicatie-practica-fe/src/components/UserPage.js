import { useEffect, useState } from "react";
import { axiosPrivate } from "../axios";
import UserHeader from "./UserHeader";

export default function UserPage() {
  const [user, setUser] = useState({
    name: "",
    role: "",
  });
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const name = localStorage.getItem("user_name");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    const user = {
      name: name,
      role: role,
    };
    if (name) {
      setUser(user);
    }
    try {
      axiosPrivate
        .get(`/api/v1/user/get-countries?email=${email}`)
        .then((response) => {
          setCountries(response.data);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <div>
      <UserHeader
        text={"Welcome user " + user.name + "! " + "Current role: " + user.role}
      />
      <div className="app-container">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Image</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, key) => (
              <tr key={key}>
                <td>{country.code}</td>
                <td>{country.name}</td>
                {country.imageId ? (
                  <td>
                    <img
                      src={`http://localhost:8080/api/v1/image/${country?.imageId}`}
                      width="100px"
                      height="50px"
                    />
                  </td>
                ) : (
                  <td>
                    <p>No image available</p>
                  </td>
                )}

                <td>The best country</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
