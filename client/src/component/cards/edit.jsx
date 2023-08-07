import React, { useEffect, useState } from "react";
import "./card.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [memberName, setMemberName] = useState("");
  const [todoText, setTodoText] = useState("");
  const [data, setData] = useState("");

  const navigate = useNavigate();

  const customHeaders = {
    'Authorization': localStorage.getItem("token")
  };

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleInputChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleInputChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleInputChangeMemberName = (e) => {
    setMemberName(e.target.value);
  };

  const { id } = useParams();

  useEffect(() => {
    findData();
  }, []);

  async function findData() {
    try {
      const response = await axios.get(`http://localhost:5050/api/todo/${id}` ,{ headers: customHeaders });
      setData(response.data.data);

      // Set the state with the fetched data
      setTitle(response.data.data.title);
      setTodoText(response.data.data.task);
      setStatus(response.data.data.status);
      setMemberName(response.data.data.memberName);
    } catch (err) {
      console.error("find data one error:", err);
    }
  }
  console.log(data)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCard = {
      title: title,
      todoText: todoText,
      status: status,
      memberName: memberName,
    };
    
    try {
      const response = await axios.put(
        `http://localhost:5050/api/todo/${id}`, // Corrected the parameter to 'id'
        newCard ,{headers: customHeaders }
      );
      console.log("todo update:", response.data.data);
    } catch (err) {
      console.error("update error:", err);
    }

    setTodoText("");
    setTitle("");
    setStatus("");
    setMemberName("");
    navigate("/");
  };

  return (
    <div className="types">
      <div className="modal-overlay" style={{ textTransform: "uppercase" }}>
        <div className="modal-content">
          <div className="title">
            <h3>title</h3>
            <input
              required
              type="text"
              value={title}
              onChange={handleInputChangeTitle}
              placeholder="Enter your title"
            />
          </div>
          <div className="task">
            <h3>task</h3>
            <input
              required
              type="text"
              value={todoText}
              onChange={handleInputChange}
              placeholder="Enter your todo..."
            />
          </div>
          <div className="status">
            <h3>status</h3>
            <select
              name="status"
              value={status}
              onChange={handleInputChangeStatus}
            >
             <option value="pending">pending</option>
                <option value="done">done</option>
            </select>
          </div>
          <div className="memberName">
            <h3>memberName</h3>
            <input
              required
              type="text"
              value={memberName}
              onChange={handleInputChangeMemberName}
              placeholder="Enter member Name"
            />
          </div>
          <button
            style={{
              border: "1px solid",
              backgroundColor: "green",
              color: "#fff",
              width: "100%",
              padding: "5px",
            }}
            onClick={handleSubmit}
          >
            EDIT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
