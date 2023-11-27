import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [err, setErr] = useState("");
  const [data, setData] = useState();

  async function getData() {
    const response = await fetch("http://localhost:3500");
    const result = await response.json();
    if (!response.ok) {
      setErr(result.error);
    }
    if (response.ok) {
      //   setErr("");
      setData(result);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3500/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (!response.ok) {
      setErr(result.error);
    }
    if (response.ok) {
      getData();
      setErr("Post Deleted Successfully!");
      setTimeout(() => {
        setErr("");
      }, 3000);
    }
  };

  return (
    <div className="read">
      <h1 className="heading">All Posts</h1>
      {err && <div className="alert alert-danger">{err}</div>}
      <div className="cards">
        {data?.map((elem) => (
          <div key={elem._id} className="card">
            <h4 style={{ paddingTop: "10px" }}>{elem.name}</h4>
            <h6>{elem.email}</h6>
            <p style={{ marginBottom: "10px" }}>{elem.age}</p>
            <div className="post-btns">
              <Link to={`/${elem._id}`}>
                <button
                  style={{
                    marginTop: "0%",
                    marginLeft: "25%",
                    width: "150px",
                  }}
                  type="button"
                  className="btn btn-primary"
                >
                  Edit Post
                </button>
              </Link>
              <button
                style={{
                  marginTop: "5px",
                  marginLeft: "25%",
                  marginBottom: "20px",
                  backgroundColor: "rgb(218, 30, 30)",
                  width: "150px",
                }}
                type="button"
                className="btn btn-primary"
                onClick={() => handleDelete(elem._id)}
              >
                Delete Post
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
