import { useEffect, useState } from "react";
import { axiosPrivate } from "../axios";
import UserHeader from "./UserHeader";
import SingleCard from "./SingleCard";
import { details } from "./CountryDetails";

export default function UserPage() {
  const [user, setUser] = useState({
    name: "",
    role: "",
  });
  const [countries, setCountries] = useState([]);
  const [countriesDetailed, setCountriesDetailed] = useState([]);

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

  useEffect(() => {
    if (countries.length !== 0) {
      const mergedArray = countries.map((country) => {
        const country2 = details.find(
          (country2) => country2.name === country.name
        );

        if (country2 !== undefined) {
          return { ...country, description: country2.description };
        } else {
          return { ...country, description: "No description available" };
        }
      });
      console.log(mergedArray);
      setCountriesDetailed(mergedArray);
    }
  }, [countries]);

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
            {countriesDetailed.map((country, key) => (
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

                <td>{country.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-grid">
        {countriesDetailed.map((country) => (
          <SingleCard
            key={country.id}
            name={country.name}
            img={country?.imageId}
            details={country.description}
          />
        ))}
      </div>
    </div>
  );
}
