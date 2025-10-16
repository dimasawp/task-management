import { useEffect, useState } from "react";
import API from "../api/axios";

export default function TaskForm({ task, onSuccess }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "To Do",
        deadline: "",
    });

    useEffect(() => {
        if (task) {
            setForm(task);
        } else {
            setForm({
                title: "",
                description: "",
                status: "To Do",
                deadline: "",
            });
        }
    }, [task]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (task) {
                await API.put(`/tasks/${task.task_id}`, form);
            } else {
                await API.post("/tasks", form);
            }
            onSuccess();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 border p-4 rounded shadow space-y-2">
            <h3 className="text-xl font-bold">{task ? "Edit Task" : "Add Task"}</h3>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
            <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
            <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
            <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                {task ? "Update" : "Add"}
            </button>
        </form>
    );
}
