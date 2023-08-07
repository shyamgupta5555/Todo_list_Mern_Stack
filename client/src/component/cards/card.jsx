import React, { useState, useEffect } from "react";
import "./card.css";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Card() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [memberName, setMemberName] = useState("");
  const [todoText, setTodoText] = useState("");
  const [data, setData] = useState();
  const navigate = useNavigate();

  const customHeaders = {
    Authorization: localStorage.getItem("token"),
  };

  function checkout(id) {
    navigate(`/edit/${id}`);
  }

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      navigate("/login");
    }
    console.log(userToken);
  }, []);

  useEffect(() => {
    getData();
  }, []);

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCard = {
      title: title,
      adminName: localStorage.getItem("userToken"),
      task: todoText,
      status: status,
      memberName: memberName,
    };
    try {
      const response = await axios.post(
        `http://localhost:5050/api/:${localStorage.getItem("userToken")}/todo`,
        newCard,
        { headers: customHeaders }
      );
      console.log("todo create:", response.data);
      getData();
      navigate("/");
    } catch (err) {
      console.error(" error:", err);
    }
    setTodoText("");
    setTitle("");
    setStatus("pending");
    setMemberName("");
    setOpen(false);
  };

  async function deleteClick(id) {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/todo/${id}`,
        { headers: customHeaders }
      );
      console.log("todo delete:", response.data.data);
      getData();
    } catch (err) {
      console.error("delete error:", err);
    }
  }

  const getData = async (e) => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/todo`,
        { adminName: localStorage.getItem("userToken") }
      );
      console.log("todo get:", response.data.data);
      setData(response.data.data);
    } catch (err) {
      console.error("data get error:", err);
    }
  };

  return (
    <div className="types">
      <div className="first">
        <div className="firstHeading">
          <h3>TO DO</h3>

          <h3
            onClick={() => {
              setOpen(true);
            }}
          >
            <IoMdAddCircleOutline />
          </h3>
        </div>
        <h4 style={{ color: "black", opacity: "0.5", marginLeft: "20px" }}>
          TODAY TASK
        </h4>

        {data?.map((ele) => {
          if (ele.date == new Date().toISOString().slice(0, 10))
            return (
              <>
                <div className="cards" key={ele._id}>
                  <div className="card">
                    <div className="card-content">
                      <div className="delete">
                        <MdDelete
                          onClick={() => {
                            deleteClick(ele._id);
                          }}
                        />
                      </div>
                      <h2 className="card-title">{ele.title}</h2>
                      <p className="card-description">TASK : {ele.task}</p>
                      <p>
                        status : <span>{ele.status}</span>
                      </p>
                      <p>
                        memberNumber : <span>{ele.memberName}</span>
                      </p>
                      <div className="edit">
                        <button>
                          <MdModeEdit
                            onClick={() => {
                              checkout(ele._id);
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
        })}
      </div>

      <div className="second">
        <div className="secondHeading">
          <h3>in progress</h3>
        </div>
        {data?.map((ele) => {
          if (ele.status === "pending")
            return (
              <>
                <div className="cards" key={ele._id}>
                  <div className="card">
                    <div className="card-content">
                      <div className="delete">
                        <MdDelete
                          onClick={() => {
                            deleteClick(ele._id);
                          }}
                        />
                      </div>
                      <h2 className="card-title">{ele.title}</h2>
                      <p className="card-description">TASK : {ele.task}</p>
                      <p>
                        status : <span>{ele.status}</span>
                      </p>
                      <p>
                        memberNumber : <span>{ele.memberName}</span>
                      </p>
                    </div>
                    <div className="edit">
                        <button>
                          <MdModeEdit
                            onClick={() => {
                              checkout(ele._id);
                            }}
                          />
                        </button>
                      </div>
                  </div>
                </div>
              </>
            );
        })}
      </div>

      <div className="third">
        <div className="thirdHeading">
          <h3>done</h3>
        </div>
        {data?.map((ele) => {
          if (ele.status === "done")
            return (
              <>
                <div className="cards" key={ele._id}>
                  <div className="card">
                    <div className="card-content">
                      <div className="delete">
                        <MdDelete
                          onClick={() => {
                            deleteClick(ele._id);
                          }}
                        />
                      </div>
                      <h2 className="card-title">{ele.title}</h2>
                      <p className="card-description">TASK : {ele.task} </p>
                      <p>
                        status : <span>{ele.status}</span>
                      </p>
                      <p>
                        memberNumber : <span>{ele.memberName}</span>
                      </p>
                    </div>
                    <div className="edit">
                        <button>
                          <MdModeEdit
                            onClick={() => {
                              checkout(ele._id);
                            }}
                          />
                        </button>
                      </div>
                  </div>
                </div>
              </>
            );
        })}
      </div>

      {open && (
        <div className="modal-overlay" style={{ textTransform: "uppercase" }}>
          <div className="modal-content">
            <button onClick={() => setOpen(false)}>
              <ImCross />
            </button>
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
              ADD
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
