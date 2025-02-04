import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Todo } from "./index.tsx";

const TodoDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [todo, setTodo] = useState<Todo | "empty" | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    const savedTodos = localStorage.getItem("todoArray");
    if (!savedTodos) return;

    const todos: Todo[] = JSON.parse(savedTodos);

    if (todos.length === 0) {
      setTodo("empty");
      return;
    }

    const findTodo = todos.find((todo) => todo.id === id);

    setTodo(findTodo ?? "empty");
  }, [id, router.isReady]);

  if (todo === null) return <div>通信中...</div>;
  if (todo === "empty") return <p>タスクが存在しません</p>;
  return (
    <div>
      <h1>TODO詳細</h1>
      <p>
        <strong>タスク:</strong> {todo.text}
      </p>
      <p>
        <strong>締め切り日:</strong> {todo.dueDate || "なし"}
      </p>
      <p>
        <strong>状態:</strong> {todo.isCompleted ? "完了済み" : "未完了"}
      </p>
    </div>
  );
};
export default TodoDetails;
