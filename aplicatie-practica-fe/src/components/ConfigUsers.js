import AdminHeader from "./AdminHeader";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "./ConfigCountries.css";
import { Dropdown } from "semantic-ui-react";
import Tile from "./Tile";

export default function ConfigUsers() {
  const dropdownOptions = [
    { key: 1, text: "COUNTRY", value: "COUNTRY" },
    { key: 2, text: "REGION", value: "REGION" },
  ];

  const [dropdownCountries, setDropdownCountries] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [name, setName] = useState("");
  const [initials, setInitials] = useState("");
  const [users, setUsers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [addUser, setAddUser] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
  });

  const [addCountryFormData, setAddCountryFormData] = useState({
    idUser: "",
    idCountry: "",
  });

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
    try {
      axiosPrivate.get("/api/v1/user").then((response) => {
        setUsers(response.data);
      });
    } catch (err) {
      console.error(err);
    }
    try {
      axiosPrivate.get("/api/v1/country").then((response) => {
        let countries = response.data;
        countries = countries.map((country) => {
          return {
            ...country,
            key: country.id,
            text: country.name,
            value: country.name,
          };
        });
        setDropdownCountries(countries);
        setCountries(countries);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {
    getInitials();
  }, [name]);

  useEffect(() => {
    try {
      axiosPrivate.get("/api/v1/user").then((response) => {
        setUsers(response.data);
      });
    } catch (err) {
      console.error(err);
    }
  }, [addUser]);

  const handleFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormFata = { ...formData };
    newFormFata[fieldName] = fieldValue;

    setFormData(newFormFata);
  };

  const handleAddCountryFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newAddCountryFormData = { ...addCountryFormData };
    newAddCountryFormData[fieldName] = fieldValue;
    setAddCountryFormData(newAddCountryFormData);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    let dto = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      userType: formData.userType,
    };
    try {
      axiosPrivate.post("/api/v1/auth/register", dto).then((response) => {
        setAddUser(!addUser);
      });
    } catch (err) {
      console.error(err);
    }
  };
  const onChangeDropdown = (event, result) => {
    const { name, value } = result || event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCountryFormSubmit = (event) => {
    event.preventDefault();

    const user = users.filter(
      (user) => user.id == addCountryFormData.idUser
    )?.[0];

    const country = countries.filter(
      (country) => country.id == addCountryFormData.idCountry
    )?.[0];

    const check = (obj) => obj.name === country.name;
    const exists = user.countries.some(check);

    if (user.userType === "ADMINISTRATOR") {
      alert("Administrators cannot have countries");
    } else if (user.userType === "COUNTRY" && user.countries.length === 1) {
      alert("User of type COUNTRY already have a country assigned");
    } else if (user.userType === "REGION" && exists) {
      alert("User of type REGION already has this country assigned");
    } else {
      let dto = {
        idUser: addCountryFormData.idUser,
        idCountry: addCountryFormData.idCountry,
      };
      try {
        axiosPrivate.post("/api/v1/user/add-country", dto).then((response) => {
          setAddUser(!addUser);
        });
      } catch (err) {
        console.error(err);
      }
    }
  };
  const handleRemove = (countryId, userId) => {
    console.log(countryId, userId);
    let dto = {
      idUser: userId,
      idCountry: countryId,
    };
    try {
      axiosPrivate.post("/api/v1/user/remove-country", dto).then((response) => {
        alert("Country removed");
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <AdminHeader name={name} initials={initials} text={"Config users page"} />
      <div className="app-container">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Country/Countries</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, key) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>
                  {user.countries.map((country) => (
                    <Tile
                      key={country.id}
                      handleRemove={handleRemove}
                      countryId={country.id}
                      userId={user.id}
                    >
                      {country?.name}
                    </Tile>
                  ))}
                </td>
                <td>
                  <button className="user-action-button">Delete</button>

                  <button className="user-action-button">
                    Remove last added country
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Add user</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            required="required"
            placeholder="Name"
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="email"
            required="required"
            placeholder="Email"
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="password"
            required="required"
            placeholder="Password"
            onChange={handleFormChange}
          />
          <div className="sasuasu">
            <Dropdown
              name="userType"
              placeholder="Select role"
              fluid
              selection
              options={dropdownOptions}
              value={formData.userType}
              onChange={onChangeDropdown}
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country, key) => (
            <tr key={key}>
              <td>{country.id}</td>
              <td>{country.name}</td>
              <td>{country.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add country to user </h2>
      <form onSubmit={handleAddCountryFormSubmit}>
        <input
          type="text"
          name="idUser"
          required
          placeholder="User id"
          onChange={handleAddCountryFormChange}
        />
        <input
          type="text"
          name="idCountry"
          required
          placeholder="Country id"
          onChange={handleAddCountryFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
