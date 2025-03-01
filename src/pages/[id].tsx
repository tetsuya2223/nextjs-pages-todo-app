import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import type { Todo } from "./index.tsx";
import detailsStyles from "../styles/detail.module.css";
import Link from "next/link";
import { Button } from "../components/button";
import { useDialogContext } from "@/components/dialog/provider";
import { useToastContext } from "@/components/toast/provider";

// データ保存はボタンを1つだけ設置し、まとめて管理。
type TodoData = {
  isLoading: boolean;
  data: Todo | null;
};

const defaultValue = {
  isLoading: true,
  data: null,
};

export const TodoDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [todo, setTodo] = useState<TodoData>(defaultValue);
  const [isModified, setIsModified] = useState(false);

  const { openDialog, closeDialog } = useDialogContext();
  const { showToast } = useToastContext();

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

  // 詳細を変更するための関数
  const handleChangeDetailText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;

    // stateの変更のみを実施。データベースへの保存は行わない。
    setTodo((prev) => {
      if (!prev.data) return defaultValue;

      return {
        isLoading: prev.isLoading,
        data: {
          ...prev.data,
          detail: value,
        },
      };
    });
    setIsModified(true);
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
    setIsModified(true);
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
    setIsModified(true);
  };

  const deleteTodo = () => {
    const savedTodos = localStorage.getItem("todoArray");
    if (!savedTodos) {
      showToast("error");
      return;
    }

    const parsedTodos = JSON.parse(savedTodos);

    const newTodos = parsedTodos.filter((item: Todo) => item.id !== id);

    localStorage.setItem("todoArray", JSON.stringify(newTodos));

    showToast("success");

    router.replace("/");
  };

  const confirmDelete = () => {
    openDialog({
      title: "タスクを削除しますか？",
      yesButtonText: "削除する",
      onConfirm: () => {
        deleteTodo();
        closeDialog();
      },
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

  const saveTodo = () => {
    const savedTodos = localStorage.getItem("todoArray");

    if (!savedTodos) {
      showToast("error");
      return;
    }
    const parsedTodos = JSON.parse(savedTodos) as Todo[];

    if (!todo.data) {
      showToast("error");
      return;
    }

    const newTodoArray = parsedTodos.map((item) => {
      if (item.id === todo.data?.id) {
        return todo.data;
      }

      return item;
    });

    localStorage.setItem("todoArray", JSON.stringify(newTodoArray));

    setIsModified(false);
    showToast("success");
  };

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (isModified) {
        openDialog({
          title: "変更が保存されていません。\n変更を破棄しますか？",
          yesButtonText: "破棄する",
          onConfirm: () => {
            setIsModified(false);
            closeDialog();
            router.push(url);
          },
        });
        throw "Abort route change";
      }
    };
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isModified) {
        event.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);

      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [isModified, router]);

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
            <label htmlFor="taskInput" className={detailsStyles.itemHeading}>
              タスク:
            </label>
            <input
              type="text"
              id="taskInput"
              placeholder="タスクを入力"
              style={{ border: "1px solid gray" }}
              value={todo.data.text}
              onChange={handleChangeText}
            />
          </div>
        </div>

        <div className={detailsStyles.detailListItem}>
          <div className={detailsStyles.detailTextContainer}>
            <label htmlFor="detailText" className={detailsStyles.itemHeading}>
              タスク詳細:
            </label>
            <textarea
              className={detailsStyles.detailTextarea}
              name=""
              id="detailText"
              rows={5}
              placeholder="詳細を入力してください"
              maxLength={500}
              value={todo.data.detail}
              onChange={handleChangeDetailText}
            />
          </div>
        </div>

        <div className={detailsStyles.detailListItem}>
          <div className={detailsStyles.textContainer}>
            <label htmlFor="dueDate" className={detailsStyles.itemHeading}>
              締め切り日:
            </label>
            <input
              type="date"
              id="dueDate"
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

      <Link href="/" className={detailsStyles.returnLink}>
        ホームに戻る
      </Link>

      <Button variant="secondary" onClick={confirmDelete}>
        タスクを削除する
      </Button>

      <Button variant="primary" onClick={saveTodo}>
        変更内容を保存する
      </Button>
    </div>
  );
};

export default TodoDetails;
