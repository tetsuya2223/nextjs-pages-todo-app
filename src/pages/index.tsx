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
    const uuid = self.crypto.randomUUID();
    const newTodos: Todo = {
      id: uuid,
      text: text,
    };
    setTodos([...todos, newTodos]);
    setText("");
    console.log(newTodos);
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
              value={text}
              onChange={changeText}
              id="task-input"
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
