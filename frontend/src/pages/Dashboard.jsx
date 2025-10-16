import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import API from "../api/axios";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [sortDeadline, setSortDeadline] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            const params = {};
            if (statusFilter) params.status = statusFilter;
            if (sortDeadline) params.sort = "deadline";
            const res = await API.get("/tasks", { params });
            setTasks(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [statusFilter, sortDeadline]);

    const handleEdit = (task) => setEditingTask(task);
    const handleDelete = async (id) => {
        if (confirm("Are you sure to delete this task")) {
            await API.delete(`/tasks/${id}`);
            fetchTasks();
        }
    };
    const handleFormSubmit = () => {
        setEditingTask(null);
        fetchTasks();
    };
    const handleLogout = async () => {
        try {
            await API.post("/logout");
            localStorage.removeItem("token");
            navigate("/login");
            console.log("Successfully logged out");
        } catch (err) {
            console.error("Logout failed:", err.response?.data || err.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white px-4 shadow rounded">
                    Logout
                </button>
            </div>

            {/* Filter & Sort */}
            <div className="flex items-center gap-4 mb-4">
                <select
                    className="border p-2 rounded"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>

                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={sortDeadline} onChange={(e) => setSortDeadline(e.target.checked)} />
                    Sort by Deadline
                </label>
            </div>

            {/* Tasks List */}
            <div className="grid grid-cols-1 gap-4">
                {tasks.map((task) => (
                    <div key={task.task_id} className="border p-4 rounded shadow flex justify-between items-center">
                        <div>
                            <h2 className="font-bold">{task.title}</h2>
                            <p>{task.description}</p>
                            <p>Status: {task.status}</p>
                            <p>Deadline: {task.deadline}</p>
                        </div>
                        <div className="flex gap-2 text-white ">
                            <button className="bg-yellow-400 px-2 py-1 rounded" onClick={() => handleEdit(task)}>
                                Edit
                            </button>
                            <button className="bg-red-500 px-2 py-1 rounded" onClick={() => handleDelete(task.task_id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Task Form */}
            <TaskForm task={editingTask} onSuccess={handleFormSubmit} />
        </div>
    );
}
