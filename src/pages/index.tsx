import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import Link from "next/link";
import { Dialog } from "../components/Dialog";
import { Button } from "../components/Button";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

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

  const confirmDelete = (id: string) => {
    setDeleteTarget(id);
    setIsDialogOpen(true);
  };

  const deleteTodos = () => {
    if (!deleteTarget) return; // 削除対象がない場合は何もしない

    // 削除対象のIDを除外
    const newTodos = todos.filter((todo) => todo.id !== deleteTarget);

    // 更新後のデータを適用
    localStorage.setItem("todoArray", JSON.stringify(newTodos));
    setTodos(applyFilter(filter, newTodos));

    // モーダルを閉じる & 削除対象をリセット
    setIsDialogOpen(false);
    setDeleteTarget(null);
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
            {/* Buttonコンポーネントを使用する。 */}
            <Button
              buttonType="submit"
              variant="primary"
              text="登録"
              onClick={addTodos}
            />
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
              {/* Buttonコンポーネントを使用する。 */}
              <button
                type="button"
                className={`${styles.button} ${styles.sortButton}`}
                onClick={toggleSortOrder}
              >
                昇順
              </button>
              {/* Buttonコンポーネントを使用する。 */}
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

                    {/* Buttonコンポーネントを使用する。 */}
                    <button
                      type="button"
                      className={`${styles.button} ${styles.deleteButton} ${styles.listitem}`}
                      onClick={() => confirmDelete(todo.id)}
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
      {/* 削除確認モーダル */}
      <Dialog
        title="タスクを削除しますか？"
        yesButtonText="削除する"
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={deleteTodos}
      />
    </>
  );
}
