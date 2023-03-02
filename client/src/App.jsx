import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const client = axios.create({
    baseURL: "http://localhost:8000/users/"
  });


  useEffect(() => {
    client
      .get()
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!editing) {
      client
        .post("", formData)
        .then((response) => {
          console.log(response.data.users);
          // add the new user to the local state
          setUsers([...users, response.data.users]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      client
        .put(editUserId, formData)
        .then((response) => {
          console.log(response);
          // update the edited user in the local state
          const updatedUsers = users.map((user) => {
            if (user.id === editUserId) {
              return response.data.users;
            } else {
              return user;
            }
          });
          setUsers(updatedUsers);
          setEditing(false);
          setEditUserId(null);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setFormData({});
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setFormData(userToEdit);
    setEditing(true);
    setEditUserId(id);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // DELETE with Axios
  const deleteUser = async (id) => {
    await client.delete(`${id}`);
    setUsers(
      users.filter((user) => {
        return user.id !== id;
      })
    );
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
        </label>
        <input type="text" name="firstname" value={formData.firstname || ""} onChange={handleChange} />
        <label>
          Second Name:
        </label>
        <input type="text" name="secondname" value={formData.secondname || ""} onChange={handleChange} />
        <label>
          Email:
        </label>
        <input type="email" name="email" value={formData.email || ""} onChange={handleChange} />
        <label>
          Phone:
        </label>
        <input type="text" name="phone" value={formData.phone || ""} onChange={handleChange} />
        <label>
          Age:
        </label>
        <input type="text" name="age" value={formData.age || ""} onChange={handleChange} />
        <button type="submit">{editing ? "Update User" : "Add User"}</button>
      </form>
      <h1 className="title">Users</h1>
      <div className="card-container">
        {users.map((user) => (
          <div key={user.id} className="card">
            <h2>Name: {`${user.firstname} ${user.secondname}`}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>age: {user.age}</p>
            <button onClick={() => handleEdit(user.id)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
