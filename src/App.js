// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Repodetail from "./pages/repodetail/Repodetail";
import NotFoundPage from "./pages/404/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/repo/:id" element={<Repodetail />}></Route>
        <Route path="*" element={<NotFoundPage />} />{" "}
        {/* Catch-all route for 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
