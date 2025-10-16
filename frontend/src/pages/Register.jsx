import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/register", form);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Password Confirmation"
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Register
                </button>
            </form>
            <p className="text-center mt-4">
                Have an account?{" "}
                <Link to="/login" className="text-blue-500 underline">
                    Login
                </Link>
            </p>
        </div>
    );
}
