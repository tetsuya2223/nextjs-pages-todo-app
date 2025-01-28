import styles from "../styles/Home.module.css";
import { useState } from "react";

type Todo = {
  id: string;
  text: string;
};

export default function Home() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    console.log(text);
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
    };
    setTodos([newTodos, ...todos]);
    setText("");
    console.log(newTodos);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodos();
    }
  };

  const deleteTodos = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <>
      <h1 className={styles.title}>TODOリスト</h1>
      <div className={styles.todoContainer}>
        <div className={styles.inputArea}>
          <div className={styles.taskForm}>
            <label htmlFor="task-input">タスク:</label>
            <input
              className={styles.input}
              type="text"
              placeholder={"タスクを入力"}
              value={text}
              onChange={changeText}
              id="task-input"
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className={styles.addButton}
              onClick={addTodos}
            >
              登録
            </button>
          </div>
        </div>
        <div>
          <ul className={styles.taskList}>
            {todos.map((todo) => (
              <li className={styles.listItem} key={todo.id}>
                <p>{todo.text}</p>
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => deleteTodos(todo.id)}
                >
                  削除
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
