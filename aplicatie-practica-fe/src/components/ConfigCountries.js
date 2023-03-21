import AdminHeader from "./AdminHeader";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "./ConfigCountries.css";
export default function ConfigCountries() {
  const axiosPrivate = useAxiosPrivate();
  const [addCountry, setAddCountry] = useState(false);
  const [addImage, setAddImage] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [countries, setCountries] = useState([]);
  const [initials, setInitials] = useState("");
  const [formData, setFormData] = useState({ code: "", name: "" });

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

  useEffect(() => {
    try {
      axiosPrivate.get("/api/v1/country").then((response) => {
        setCountries(response.data);
      });
    } catch (err) {
      console.error(err);
    }
  }, [addCountry]);

  useEffect(() => {
    try {
      axiosPrivate.get("/api/v1/country").then((response) => {
        setCountries(response.data);
      });
    } catch (err) {
      console.error(err);
    }
  }, [addImage]);

  const handleFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormFata = { ...formData };
    newFormFata[fieldName] = fieldValue;

    setFormData(newFormFata);
  };

  const handleImageUpload = (event) => {
    event.preventDefault();
    setImage(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    let dto = {
      code: formData.code,
      name: formData.name,
    };

    try {
      axiosPrivate.post("/api/v1/country", dto).then((response) => {
        setAddCountry(!addCountry);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id) => {
    try {
      axiosPrivate.delete(`/api/v1/country?id=${id}`).then((response) => {
        setAddCountry(!addCountry);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageSet = (countryId, countryName) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", countryName + ".jpg");
    try {
      axiosPrivate
        .post("/api/v1/image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          let imgId = response.data;
          try {
            let dto = {
              countryId: countryId,
              imageId: imgId,
            };
            axiosPrivate
              .put("/api/v1/country/add-image", dto)
              .then((response) => {
                setAddImage(!addImage);
              });
          } catch (err) {
            console.error(err);
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <AdminHeader
        name={name}
        initials={initials}
        text={"Config countries page"}
      />
      <div className="app-container">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Code</th>
              <th>Name</th>
              <th>ImageId</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, key) => (
              <tr key={key}>
                <td>{country.id}</td>
                <td>{country.code}</td>
                <td>{country.name}</td>
                <td>{country.imageId || "No image"}</td>
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
                    <input
                      type="file"
                      name="file"
                      onChange={handleImageUpload}
                    />
                    <button
                      type="button"
                      onClick={() => handleImageSet(country.id, country.name)}
                    >
                      Set image
                    </button>
                  </td>
                )}

                <td>
                  <button
                    type="button"
                    onClick={() => handleDelete(country.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Add a country</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="code"
            required="required"
            placeholder="Country code"
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="name"
            required="required"
            placeholder="Country name"
            onChange={handleFormChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}
