import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // perlu import Routes juga
import "./index.css";
import App from "./App.jsx";
import Camera from "./pages/Camera.jsx";
import FrontPage from "./pages/FrontPage.jsx";
import Result from "./pages/Result.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <App>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FrontPage />} />
          <Route path='/camera' element={<Camera />} />
          <Route path='/result' element={<Result />} />
        </Routes>
      </BrowserRouter>
    </App>
  </StrictMode>
);
