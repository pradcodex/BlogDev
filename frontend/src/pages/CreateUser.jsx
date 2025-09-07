import { createUser } from "../api";
import { useState } from "react";

export function CreateUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let response = await createUser(user);
    if (response.status !== 200) {
      alert("user account could not be created");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        onChange={handleChange}
        name="name"
        required
        maxLength={10}
      />
      <input
        placeholder="Email"
        onChange={handleChange}
        email="email"
        required
        maxLength={50}
      />
      <input
        placeholder="Password"
        onChange={handleChange}
        password="password"
        required
        maxLength={10}
      />
      <button type="submit ">Create Account</button>
    </form>
  );
}
