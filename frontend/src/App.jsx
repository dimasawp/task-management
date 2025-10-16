import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<p className="text-center mt-20">Page Not Found.</p>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
