import React, { useEffect, useState } from "react";

interface Todo {
    id: number;
    text: string;
    done: boolean;
}

interface TodosResponse {
    todos: Todo[];
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newText, setNewText] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:4000/api/todos")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data: TodosResponse) => {
                setTodos(data.todos);
            })
            .catch((err) => {
                console.error(err);
                setError("Could not load to-dos.");
            });
    }, []);

    const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newText.trim()) return;

        fetch("http://127.0.0.1:4000/api/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: newText }),
        })
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data: { todo: Todo }) => {
                setTodos((prev) => [...prev, data.todo]);
                setNewText("");
            })
            .catch((err) => {
                console.error(err);
                setError("Could not add to-do.");
            });
    };

    const toggleTodo = (id: number, done: boolean) => {
        fetch(`http://127.0.0.1:4000/api/todos/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ done: !done }),
        })
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data: { todo: Todo }) => {
                setTodos((prev) =>
                    prev.map((t) => (t.id === data.todo.id ? data.todo : t))
                );
            })
            .catch((err) => {
                console.error(err);
                setError("Could not update to-do.");
            });
    };

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul style={{ listStyle: "none", padding: 0 }}>
                {todos.map((todo) => (
                    <li key={todo.id} style={{ marginBottom: "0.5rem" }}>
                        <label style={{ cursor: "pointer" }}>
                            <input
                                type="checkbox"
                                checked={todo.done}
                                onChange={() => toggleTodo(todo.id, todo.done)}
                                style={{ marginRight: "0.5rem" }}
                            />
                            <span
                                style={{
                                    textDecoration: todo.done ? "line-through" : "none",
                                }}
                            >
                                {todo.text}
                            </span>
                        </label>
                    </li>
                ))}
            </ul>

            <form onSubmit={addTodo} style={{ marginTop: "0.5rem" }}>
                <input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="Add something for today…"
                    style={{ width: "100%", padding: "0.4rem" }}
                />
            </form>
        </div>
    );
};

export default TodoList;
