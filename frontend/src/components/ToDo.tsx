import React, { useEffect, useMemo, useState } from "react";

type Todo = {
    id: string;
    text: string;
    done: boolean;
    createdAt: number;
};

const STORAGE_KEY = "dad_dashboard_todos_v1";

function uid() {
    // simple unique-enough id for a small app
    return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function loadTodos(): Todo[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(Boolean);
    } catch {
        return [];
    }
}

function saveTodos(todos: Todo[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
        // ignore (private mode / storage full)
    }
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
    const [text, setText] = useState("");
    const [filter, setFilter] = useState<"all" | "active" | "done">("all");

    useEffect(() => {
        saveTodos(todos);
    }, [todos]);

    const remainingCount = useMemo(
        () => todos.filter((t) => !t.done).length,
        [todos]
    );

    const visibleTodos = useMemo(() => {
        if (filter === "active") return todos.filter((t) => !t.done);
        if (filter === "done") return todos.filter((t) => t.done);
        return todos;
    }, [todos, filter]);

    function addTodo() {
        const trimmed = text.trim();
        if (!trimmed) return;

        const next: Todo = {
            id: uid(),
            text: trimmed,
            done: false,
            createdAt: Date.now(),
        };

        setTodos((prev) => [next, ...prev]);
        setText("");
    }

    function toggleTodo(id: string) {
        setTodos((prev) =>
            prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
        );
    }

    function deleteTodo(id: string) {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    }

    function clearDone() {
        setTodos((prev) => prev.filter((t) => !t.done));
    }

    function markAllDone() {
        setTodos((prev) => prev.map((t) => ({ ...t, done: true })));
    }

    return (
        <div className="todo-widget">
            <form
                className="todo-add-row"
                onSubmit={(e) => {
                    e.preventDefault();
                    addTodo();
                }}
            >
                <input
                    className="todo-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a task…"
                    aria-label="Add a task"
                />
                <button className="todo-add-btn" type="submit">
                    Add
                </button>
            </form>

            <div className="todo-controls">
                <div className="todo-filters" role="tablist" aria-label="Todo filters">
                    <button
                        type="button"
                        className={`todo-filter-btn ${filter === "all" ? "active" : ""}`}
                        onClick={() => setFilter("all")}
                    >
                        All
                    </button>
                    <button
                        type="button"
                        className={`todo-filter-btn ${filter === "active" ? "active" : ""}`}
                        onClick={() => setFilter("active")}
                    >
                        Active
                    </button>
                    <button
                        type="button"
                        className={`todo-filter-btn ${filter === "done" ? "active" : ""}`}
                        onClick={() => setFilter("done")}
                    >
                        Done
                    </button>
                </div>

                <div className="todo-actions">
                    <span className="todo-remaining">{remainingCount} left</span>
                    <button type="button" className="todo-action-btn" onClick={markAllDone}>
                        Mark all done
                    </button>
                    <button type="button" className="todo-action-btn" onClick={clearDone}>
                        Clear done
                    </button>
                </div>
            </div>

            <div className="todo-list" role="list">
                {visibleTodos.length === 0 ? (
                    <p className="todo-empty">
                        {filter === "done"
                            ? "No completed tasks yet."
                            : filter === "active"
                                ? "No active tasks — nice."
                                : "No tasks yet. Add one above."}
                    </p>
                ) : (
                    visibleTodos.map((t) => (
                        <div className={`todo-item ${t.done ? "done" : ""}`} key={t.id} role="listitem">
                            <label className="todo-item-left">
                                <input
                                    type="checkbox"
                                    checked={t.done}
                                    onChange={() => toggleTodo(t.id)}
                                    aria-label={`Mark "${t.text}" as ${t.done ? "not done" : "done"}`}
                                />
                                <span className="todo-text">{t.text}</span>
                            </label>

                            <button
                                type="button"
                                className="todo-delete-btn"
                                onClick={() => deleteTodo(t.id)}
                                aria-label={`Delete "${t.text}"`}
                                title="Delete"
                            >
                                ✕
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
