import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    age: 0,
  });

  function handleChange(event) {
    setData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3500", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = res.json();

    if (!res.ok) {
      setErr(result.error);
    }

    if (res.ok) {
      setErr("");
      navigate("/all");
    }
  };

  return (
    <div className="container">
      {err && <div className="alert alert-danger">{err}</div>}
      <h1 className="heading">Enter Data</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{ marginBottom: "5px" }} htmlFor="inputName">
            Name:
          </label>
          <input
            style={{ marginBottom: "5px" }}
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter your name"
            value={data.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label
            style={{ marginBottom: "5px", marginTop: "5px" }}
            htmlFor="inputEmail"
          >
            Email:
          </label>
          <input
            style={{ marginBottom: "5px" }}
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Enter your email"
            value={data.email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label
            style={{ marginBottom: "5px", marginTop: "5px" }}
            htmlFor="inputAge"
          >
            Age:
          </label>
          <input
            style={{ marginBottom: "5px" }}
            type="number"
            className="form-control"
            id="inputAge"
            placeholder="Enter your age"
            value={data.age}
            name="age"
            onChange={handleChange}
          />
        </div>
        <button
          style={{ marginTop: "30px", marginLeft: "40%" }}
          type="submit"
          className="btn btn-primary"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default Create;
