import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Todo } from "./index.tsx";
import styles from "../styles/detail.module.css";
import Link from "next/link";

const TodoDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  type TodoState = {
    todo: Todo | null;
    isEditing: { [key: string]: boolean };
    editText: { [key: string]: string };
  };

  const [state, setState] = useState<TodoState>({
    todo: null,
    isEditing: {
      text: false,
      dueDate: false,
      isCompleted: false,
    },
    editText: {},
  });

  useEffect(() => {
    if (!router.isReady) return;

    const savedTodos = localStorage.getItem("todoArray");
    if (!savedTodos) return;

    const todos: Todo[] = JSON.parse(savedTodos);

    if (todos.length === 0) {
      setState((prev) => ({
        ...prev,
        todo: null,
      }));
      return;
    }

    const findTodo = todos.find((todo) => todo.id === id);

    setState((prev) => ({
      ...prev,
      todo: findTodo ?? null,
    }));
  }, [id, router.isReady]);

  const handleEditClick = (field: keyof Todo) => {
    if (state.todo === null) return;

    setState((prev) => ({
      ...prev,
      isEditing: {
        ...prev.isEditing,
        [field]: true,
      },
      editText: {
        ...prev.editText,
        [field]:
          typeof prev.todo?.[field] === "boolean"
            ? String(prev.todo[field])
            : prev.todo?.[field] ?? "",
      },
    }));
  };

  const handleInputChange = (field: keyof Todo, value: string) => {
    setState((prev) => ({
      ...prev,
      editText: {
        ...prev.editText,
        [field]: typeof value === "boolean" ? String(value) : value,
      },
    }));
  };

  const handleSave = (field: keyof Todo) => {
    if (state.todo === null) return;

    const updatedTodo = { ...state.todo };

    if (field === "isCompleted") {
      updatedTodo.isCompleted = !state.todo.isCompleted;
    } else {
      updatedTodo[field] = state.editText[field] ?? "";
    }

    const savedTodos = localStorage.getItem("todoArray");
    if (savedTodos) {
      const todos: Todo[] = JSON.parse(savedTodos);
      const updatedTodos = todos.map((t) => (t.id === id ? updatedTodo : t));
      localStorage.setItem("todoArray", JSON.stringify(updatedTodos));
    }

    setState((prev) => ({
      ...prev,
      todo: updatedTodo,
      isEditing: {
        ...prev.isEditing,
        [field]: false,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (state.todo === null) return <div>通信中...</div>;
  if (state.todo.text.trim().length === 0) return <p>タスクが存在しません</p>;
  return (
    <div className={styles.detailContainer}>
      <h1 className={styles.detailHeader}>TODO詳細</h1>
      <div className={styles.detailList}>
        <form className={styles.detailListItem} onSubmit={handleSubmit}>
          <div className={styles.textContainer}>
            <span className={styles.itemHeading}>タスク:</span>
            {state.isEditing.text ? (
              <input
                type="text"
                value={state.todo.text}
                onChange={(e) => handleInputChange("text", e.target.value)}
                onBlur={() => handleSave("text")}
                className={styles.inputField}
                autoFocus
              />
            ) : (
              <p className={styles.listItemText}>{state.todo.text}</p>
            )}
          </div>
          {state.isEditing.text ? (
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
            {state.isEditing.dueDate ? (
              <input
                type="date"
                value={state.editText.dueDate || ""}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                onBlur={() => handleSave("dueDate")}
                onKeyDown={(e) => e.key === "Enter" && handleSave("dueDate")}
                className={styles.inputField}
                autoFocus
              />
            ) : (
              <p>{state.todo.dueDate || "なし"}</p>
            )}
          </div>
          {state.isEditing.dueDate ? (
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
            <p>{state.todo.isCompleted ? "完了済み" : "未完了"}</p>
          </div>
          <button
            type="submit"
            className={`${styles.button} ${styles.editButton}`}
            onClick={() => handleSave("isCompleted")}
          >
            {state.todo.isCompleted ? "未完了にする" : "完了にする"}
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
