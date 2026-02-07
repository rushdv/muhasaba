import { useEffect, useState } from "react";
import { getLogs, createLog, toggleLog, deleteLog } from "../api/muhasaba";

export default function Dashboard() {
    const [logs, setLogs] = useState([]);
    const [task, setTask] = useState("");

    const load = async () => setLogs(await getLogs());
    useEffect(() => { load(); }, []);

    const add = async () => {
        await createLog({ task_name: task, log_date: new Date().toISOString().slice(0, 10) });
        setTask("");
        load();
    };

    const handleToggle = async (id) => {
        await toggleLog(id);
        load();
    };

    const handleDelete = async (id) => {
        await deleteLog(id);
        load();
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Muhasaba Dashboard</h2>

            <div className="flex gap-2 mb-8">
                <input
                    className="border p-2 rounded flex-1"
                    value={task}
                    onChange={e => setTask(e.target.value)}
                    placeholder="New task..."
                />
                <button
                    className="bg-emerald-600 text-white px-4 py-2 rounded"
                    onClick={add}
                >
                    Add
                </button>
            </div>

            <div className="space-y-2">
                {logs.map(l => (
                    <div key={l.id} className="flex items-center justify-between p-3 border rounded">
                        <span
                            className={`cursor-pointer ${l.is_completed ? "line-through text-gray-400" : ""}`}
                            onClick={() => handleToggle(l.id)}
                        >
                            {l.task_name}
                        </span>
                        <button
                            className="text-red-500 font-bold px-2"
                            onClick={() => handleDelete(l.id)}
                        >
                            x
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
