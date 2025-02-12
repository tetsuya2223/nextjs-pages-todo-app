import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import Link from "next/link";

export type Todo = {
  id: string;
  text: string;
  detail: string | null;
  dueDate: string;
  isCompleted: boolean;
};

export default function Home() {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const saveTodos = localStorage.getItem("todoArray");
    if (saveTodos) {
      setTodos(JSON.parse(saveTodos));
    }
  }, []);

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const assignDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  const addTodos = () => {
    if (!text.trim()) {
      alert("タスクを入力してください");
      return;
    }

    const uuid = self.crypto.randomUUID();
    const newTodos: Todo = {
      id: uuid,
      text: text,
      detail: null,
      dueDate: dueDate
        ? formatInTimeZone(dueDate, "Asia/Tokyo", "yyyy/MM/dd")
        : "",
      isCompleted: false,
    };

    const newTodoArray = [newTodos, ...todos];

    setTodos(newTodoArray);
    localStorage.setItem("todoArray", JSON.stringify(newTodoArray));

    setText("");
    setDueDate("");
  };

  const toggleCompleted = (id: string) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      );

      localStorage.setItem("todoArray", JSON.stringify(updatedTodos));

      return updatedTodos;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const deleteTodos = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todoArray", JSON.stringify(newTodos));
  };

  return (
    <>
      <h1 className={styles.title}>TODOリスト</h1>
      <div className={styles.todoContainer}>
        <form className={styles.inputArea} onSubmit={handleSubmit}>
          <div className={styles.taskForm}>
            <label htmlFor="task-input">タスク:</label>
            <input
              className={styles.input}
              type="text"
              placeholder={"タスクを入力"}
              value={text}
              onChange={changeText}
              id="task-input"
            />
            <p>締め切り日：</p>
            <input type="date" value={dueDate} onChange={assignDueDate} />
            <button
              type="submit"
              className={`${styles.button} ${styles.addButton}`}
              onClick={addTodos}
            >
              登録
            </button>
          </div>
        </form>
        <div>
          <ul className={styles.taskList}>
            {todos.map((todo) => (
              <li className={styles.listItems} key={todo.id}>
                <Link href={`/${todo.id}`}>
                  <p
                    className={`${styles.listItemText} ${styles.listitem} ${
                      todo.isCompleted ? styles.listItemTextComped : ""
                    }`}
                  >
                    {todo.text}
                  </p>
                </Link>
                {/* 今後、リストの表示方法は修正します。 */}
                <div className={styles.btnContainer}>
                  <p className={styles.inputDate}>{todo.dueDate}</p>
                  <button
                    type="button"
                    className={`${styles.button} ${styles.completeButton} ${styles.listitem}`}
                    onClick={() => toggleCompleted(todo.id)}
                  >
                    完了
                  </button>
                  <button
                    type="button"
                    className={`${styles.button} ${styles.deleteButton} ${styles.listitem}`}
                    onClick={() => deleteTodos(todo.id)}
                  >
                    削除
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
