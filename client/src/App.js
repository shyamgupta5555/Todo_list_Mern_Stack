import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import SignIn from "./pages/signin/Signin";
import Navbar from "./component/navbar/Navbar";
import Card from "./component/cards/card";
import Edit from "./component/cards/edit";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignIn />} />
        <Route path="/" element={<Card />} />
        <Route path="/edit/:id" element={<Edit/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
