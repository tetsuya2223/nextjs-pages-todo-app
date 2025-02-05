import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Todo } from "./index.tsx";
import styles from "../styles/detail.module.css";
import Link from "next/link";

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
    <div className={styles.detailContainer}>
      <h1 className={styles.detailHeader}>TODO詳細</h1>
      <div className={styles.detailList}>
        <div className={styles.detailListItem}>
          <div className={styles.textContainer}>
            <span className={styles.itemHeading}>タスク:</span>
            <p className={styles.listItemText}>{todo.text}</p>
          </div>
          <button
            type="button"
            className={`${styles.button} ${styles.editButton}`}
          >
            編集
          </button>
        </div>
        <div className={styles.detailListItem}>
          <div className={styles.textContainer}>
            <span className={styles.itemHeading}>締め切り日:</span>
            <p>{todo.dueDate || "なし"}</p>
          </div>
          <button
            type="button"
            className={`${styles.button} ${styles.editButton}`}
          >
            編集
          </button>
        </div>
        <div className={styles.detailListItem}>
          <div className={styles.textContainer}>
            <span className={styles.itemHeading}>状態:</span>
            <p>{todo.isCompleted ? "完了済み" : "未完了"}</p>
          </div>
          <button
            type="button"
            className={`${styles.button} ${styles.editButton}`}
          >
            編集
          </button>
        </div>
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
