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
  const [filter, setFilter] = useState<Filter>("all"); // フィルターの状態を保持

  useEffect(() => {
    const saveTodos = localStorage.getItem("todoArray");

    if (saveTodos) {
      setTodos(JSON.parse(saveTodos));
    }
  }, []);

  const applyFilter = (filterValue: Filter, todosArray: Todo[]): Todo[] => {
    const filterConditions: Record<Filter, (todo: Todo) => boolean> = {
      all: () => true,
      completed: (todo) => todo.isCompleted,
      unCompleted: (todo) => !todo.isCompleted,
    };

    return todosArray.filter(filterConditions[filterValue] || (() => true));
  };

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
    // `localStorage` のデータを取得
    const saveTodos = localStorage.getItem("todoArray");
    const allTodos: Todo[] = saveTodos ? JSON.parse(saveTodos) : [];

    // 新しいタスクを追加
    const newTodoArray = [newTodos, ...allTodos];

    // `localStorage` を更新
    localStorage.setItem("todoArray", JSON.stringify(newTodoArray));

    // `applyFilter()` の戻り値を `setTodos()` に渡す
    setTodos(applyFilter(filter, newTodoArray));

    setText("");
    setDueDate("");
  };

  const toggleCompleted = (id: string) => {
    const saveTodos = localStorage.getItem("todoArray");
    if (!saveTodos) return;

    const allTodos: Todo[] = JSON.parse(saveTodos);

    const updatedTodos = allTodos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );

    // 更新したタスクリストを localStorage に保存
    localStorage.setItem("todoArray", JSON.stringify(updatedTodos));

    // フィルターを適用して `setTodos` を更新
    setTodos(applyFilter(filter, updatedTodos));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const deleteTodos = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todoArray", JSON.stringify(newTodos));
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filterValue = event.target.value as Filter;
    setFilter(filterValue);

    const saveTodos = localStorage.getItem("todoArray");
    if (!saveTodos) return;

    const parsedTodos: Todo[] = JSON.parse(saveTodos);
    setTodos(applyFilter(filterValue, parsedTodos));
  };

  const toggleSortOrder = () => {
    const saveTodos = localStorage.getItem("todoArray");
    if (!saveTodos) return;

    const parsedTodos: Todo[] = JSON.parse(saveTodos);
    const sortedTodos = parsedTodos.sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
      return dateA - dateB;
    });

    setTodos(applyFilter(filter, sortedTodos));
  };

  const toggleSortOrderDesc = () => {
    const saveTodos = localStorage.getItem("todoArray");
    if (!saveTodos) return;

    const parsedTodos: Todo[] = JSON.parse(saveTodos);
    const sortedTodos = parsedTodos.sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
      return dateB - dateA;
    });

    setTodos(applyFilter(filter, sortedTodos));
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
              onChange={handleOptionChange}
            >
              <option value="all">すべてのタスク</option>
              <option value="completed">完了したタスク</option>
              <option value="unCompleted">完了していないタスク</option>
            </select>
            <div className={styles.sortOder}>
              <button
                type="button"
                className={`${styles.button} ${styles.sortButton}`}
                onClick={toggleSortOrder}
              >
                昇順
              </button>
              <button
                type="button"
                className={`${styles.button} ${styles.sortButton}`}
                onClick={toggleSortOrderDesc}
              >
                降順
              </button>
            </div>
          </div>
          <div>
            <ul className={styles.taskList}>
              {todos.map((todo) => (
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
