import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import type { Todo } from "./index.tsx";
import detailsStyles from "../styles/detail.module.css";
import Link from "next/link";

// データ保存はボタンを1つだけ設置し、まとめて管理。
type TodoData = {
  isLoading: boolean;
  data: Todo | null;
};

const defaultValue = {
  isLoading: true,
  data: null,
};

const TodoDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [todo, setTodo] = useState<TodoData>(defaultValue);

  // textを変更するための関数
  const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    // ここでは state の変更に留めること
    setTodo((prev) => {
      if (!prev.data) return defaultValue;

      return {
        isLoading: prev.isLoading,
        data: {
          ...prev.data,
          text: value,
        },
      };
    });
  };

  // 締め切り日を変更するための関数
  const handleAssignDate = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    // ここでは state の変更に留めること
    setTodo((prev) => {
      if (!prev.data) return defaultValue;

      return {
        isLoading: prev.isLoading,
        data: {
          ...prev.data,
          dueDate: value,
        },
      };
    });
  };

  // 完了/未完了を切り変える関数
  const handleCompleted = () => {
    setTodo((prev) => {
      if (!prev.data) return defaultValue;

      return {
        isLoading: prev.isLoading,
        data: {
          ...prev.data,
          isCompleted: !prev.data.isCompleted,
        },
      };
    });
  };

  useEffect(() => {
    if (!router.isReady) return;

    const savedTodos = localStorage.getItem("todoArray");

    if (!savedTodos) {
      setTodo({ isLoading: false, data: null });
      return;
    }

    const todos: Todo[] = JSON.parse(savedTodos);

    if (todos.length === 0) {
      setTodo({ isLoading: false, data: null });
      return;
    }

    const findTodo = todos.find((todo) => todo.id === id);

    if (!findTodo) {
      setTodo({ isLoading: false, data: null });
      return;
    }

    setTodo({ isLoading: false, data: findTodo });
  }, [id, router.isReady]);

  // 1. データ通信中の場合
  if (todo.isLoading) {
    return <div className={detailsStyles.detailContainer}>通信中...</div>;
  }

  // 2. データ通信が完了したが、データが存在しなかった場合
  if (!todo.data) {
    return (
      <div className={detailsStyles.detailContainer}>
        <p>タスクが存在しません</p>
        <Link
          href="/"
          className={`${detailsStyles.button} ${detailsStyles.returnButton}`}
        >
          ホームに戻る
        </Link>
      </div>
    );
  }

  // 3. データ通信が完了し、データが存在していた場合（data が null でない場合）
  return (
    <div className={detailsStyles.detailContainer}>
      <h1 className={detailsStyles.detailHeader}>TODOタスク詳細</h1>

      <div className={detailsStyles.detailList}>
        <div className={detailsStyles.detailListItem}>
          <div className={detailsStyles.textContainer}>
            <span className={detailsStyles.itemHeading}>タスク:</span>
            <input
              type="text"
              id="task-input"
              placeholder="タスクを入力"
              style={{ border: "1px solid gray" }}
              value={todo.data.text}
              onChange={handleChangeText}
            />
          </div>
        </div>

        <div className={detailsStyles.detailListItem}>
          <div className={detailsStyles.textContainer}>
            <span className={detailsStyles.itemHeading}>締め切り日:</span>
            <input
              type="date"
              value={todo.data.dueDate}
              onChange={handleAssignDate}
            />
          </div>
        </div>

        <div className={detailsStyles.detailListItem}>
          <div className={detailsStyles.textContainer}>
            <span className={detailsStyles.itemHeading}>状態:</span>
            <input
              // 完了/未完了の状態切替にチェックボックスを使用
              type="checkbox"
              id="isCompleted"
              className={detailsStyles.checkbox}
              // isCompleted が true ならチェックが入る
              checked={todo.data.isCompleted}
              onChange={handleCompleted}
            />
            <label htmlFor="isCompleted">
              {todo.data.isCompleted ? "完了" : "未完了"}
            </label>
          </div>
        </div>
      </div>

      <Link
        href="/"
        className={`${detailsStyles.button} ${detailsStyles.returnButton}`}
      >
        ホームに戻る
      </Link>

      <button
        type="button"
        className={`${detailsStyles.button} ${detailsStyles.deleteButton}`}
      >
        タスクを削除する
      </button>

      <button //保存ボタンを押すまではデータベース（ここではlocalstorage）へデータは保存しない。
        type="button"
        className={`${detailsStyles.button} ${detailsStyles.editButton}`}
        onClick={() => {
          const savedTodos = localStorage.getItem("todoArray");

          if (!savedTodos) return;
          const parsedTodos = JSON.parse(savedTodos) as Todo[];

          if (!todo.data) return;

          const newTodoArray = parsedTodos.map((item) => {
            if (item.id === todo.data?.id) {
              return todo.data;
            }

            return item;
          });

          localStorage.setItem("todoArray", JSON.stringify(newTodoArray));
        }}
      >
        変更内容を保存する
      </button>
    </div>
  );
};

export default TodoDetails;
