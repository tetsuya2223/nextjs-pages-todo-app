import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Todo } from "./index.tsx";
import styles from "../styles/detail.module.css";
import Link from "next/link";

const TodoDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [todo, setTodo] = useState<Todo | "empty" | null>(null);
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [editText, setEditText] = useState<{ [key: string]: string }>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

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

  const handleEditClick = (field: keyof Todo) => {
    if (todo === null || todo === "empty") return;
    setIsEditing((prev) => ({
      ...prev,
      [field]: true,
    }));

    if (field === "isCompleted") {
      setIsCompleted(todo.isCompleted);
    } else {
      setEditText((prev) => ({
        ...prev,
        [field]: todo && typeof todo !== "string" ? todo[field] : "",
      }));
    }
  };
  const handleInputChange = (field: string, value: string) => {
    setEditText((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (field: keyof Todo) => {
    if (!todo || todo === "empty") return;

    const updatedTodo = { ...todo };

    if (field === "isCompleted") {
      updatedTodo.isCompleted = !isCompleted;
      setIsCompleted(updatedTodo.isCompleted);
    } else {
      updatedTodo[field] = editText[field];
    }

    setTodo(updatedTodo);

    const savedTodos = localStorage.getItem("todoArray");
    if (savedTodos) {
      const todos: Todo[] = JSON.parse(savedTodos);
      const updatedTodos = todos.map((t) => (t.id === id ? updatedTodo : t));
      localStorage.setItem("todoArray", JSON.stringify(updatedTodos));
    }

    setIsEditing((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (todo === null) return <div>通信中...</div>;
  if (todo === "empty") return <p>タスクが存在しません</p>;
  return (
    <div className={styles.detailContainer}>
      <h1 className={styles.detailHeader}>TODO詳細</h1>
      <div className={styles.detailList}>
        <form className={styles.detailListItem} onSubmit={handleSubmit}>
          <div className={styles.textContainer}>
            <span className={styles.itemHeading}>タスク:</span>
            {isEditing.text ? (
              <input
                type="text"
                value={editText.text}
                onChange={(e) => handleInputChange("text", e.target.value)}
                onBlur={() => handleSave("text")}
                className={styles.inputField}
                autoFocus
              />
            ) : (
              <p className={styles.listItemText}>{todo.text}</p>
            )}
          </div>
          {isEditing.text ? (
            <button
              type="submit"
              className={`${styles.button} ${styles.editButton}`}
              onClick={() => handleSave("text")}
            >
              保存
            </button>
          ) : (
            <button
              type="button"
              className={`${styles.button} ${styles.editButton}`}
              onClick={() => handleEditClick("text")}
            >
              編集
            </button>
          )}
        </form>

        <form className={styles.detailListItem} onSubmit={handleSubmit}>
          <div className={styles.textContainer}>
            <span className={styles.itemHeading}>締め切り日:</span>
            {isEditing.dueDate ? (
              <input
                type="date"
                value={editText.dueDate || ""}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                onBlur={() => handleSave("dueDate")}
                onKeyDown={(e) => e.key === "Enter" && handleSave("dueDate")}
                className={styles.inputField}
              />
            ) : (
              <p>{todo.dueDate || "なし"}</p>
            )}
          </div>
          {isEditing.dueDate ? (
            <button
              type="submit"
              className={`${styles.button} ${styles.editButton}`}
              onClick={() => handleSave("dueDate")}
            >
              保存
            </button>
          ) : (
            <button
              type="button"
              className={`${styles.button} ${styles.editButton}`}
              onClick={() => handleEditClick("dueDate")}
            >
              編集
            </button>
          )}
        </form>

        <form className={styles.detailListItem} onSubmit={handleSubmit}>
          <div className={styles.textContainer}>
            <span className={styles.itemHeading}>状態:</span>
            <p>{todo.isCompleted ? "完了済み" : "未完了"}</p>
          </div>
          <button
            type="submit"
            className={`${styles.button} ${styles.editButton}`}
            onClick={() => handleSave("isCompleted")}
          >
            {todo.isCompleted ? "未完了にする" : "完了にする"}
          </button>
        </form>
      </div>
      <Link href="/" className={`${styles.button} ${styles.returnButton}`}>
        ホームに戻る
      </Link>

      <button
        type="button"
        className={`${styles.button} ${styles.deleteButton}`}
      >
        タスクを削除する
      </button>
    </div>
  );
};
export default TodoDetails;
