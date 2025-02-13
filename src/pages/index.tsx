import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import Link from "next/link";

export type Todo = {
  id: string;
  text: string;
  detail: string;
  dueDate: string;
  isCompleted: boolean;
};

type Filter = "all" | "completed" | "unCompleted";

export default function Home() {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [order, setOrder] = useState("asc");

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
      detail: "",
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

  const handleFilter = (filter: Filter) => {
    setFilter(filter);
  };
  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "all":
        return todo;
      case "completed":
        return todo.isCompleted;
      case "unCompleted":
        return !todo.isCompleted;
      default:
        return todo;
    }
  });
  const sortTodos = (order: "asc" | "desc") => {
    setTodos((prevTodos) => {
      const sortedTodos = [...prevTodos].sort((a, b) => {
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
        return order === "asc" ? dateA - dateB : dateB - dateA;
      });
      localStorage.setItem("todoArray", JSON.stringify(sortedTodos));
      return sortedTodos;
    });
  };
  const toggleSortOrder = () => {
    setOrder((prevOrder) => {
      const newOrder = prevOrder === "asc" ? "desc" : "asc";
      sortTodos(newOrder);
      return newOrder;
    });
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

        <div className={styles.ListContainer}>
          <div className={styles.sortContainer}>
            <select
              className={styles.sortBox}
              defaultValue="all"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleFilter(e.target.value as Filter)
              }
            >
              <option value="all">すべてのタスク</option>
              <option value="completed">完了したタスク</option>
              <option value="unCompleted">現在のタスク</option>
            </select>
            <button
              type="button"
              className={`${styles.button} ${styles.sortButton}`}
              onClick={toggleSortOrder}
            >
              締切順で並べ替え
            </button>
          </div>
          <div>
            <ul className={styles.taskList}>
              {filteredTodos.map((todo) => (
                <li className={styles.listItems} key={todo.id}>
                  <div className={styles.textContainer}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      onChange={() => toggleCompleted(todo.id)}
                      checked={todo.isCompleted}
                    />
                    <Link href={`/${todo.id}`}>
                      <p
                        className={`${styles.listItemText} ${styles.listitem} ${
                          todo.isCompleted ? styles.listItemTextComped : ""
                        }`}
                      >
                        {todo.text}
                      </p>
                    </Link>
                  </div>
                  {/* 今後、リストの表示方法は修正します。 */}
                  <div className={styles.btnContainer}>
                    <p className={styles.inputDate}>{todo.dueDate}</p>

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
      </div>
    </>
  );
}
