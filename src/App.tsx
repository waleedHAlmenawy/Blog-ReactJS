import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import IsAuth from "./pages/IsAuth";
import RequireAuth from "./pages/RequireAuth";
import ArticleForm from "./pages/ArticleForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<IsAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/add" element={<ArticleForm />} />
          <Route path="/edit" element={<ArticleForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
