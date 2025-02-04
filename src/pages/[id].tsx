import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Todo } from "./index.tsx";

const TodoDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [todo, setTodo] = useState<Todo | {} | null>(null);

  useEffect(() => {
    if (!router.isReady) return; //クエリが取得できていない場合にuseEffectが実行しないように制御。

    const savedTodos = localStorage.getItem("todoArray");

    if (savedTodos) {
      const todos: Todo[] = JSON.parse(savedTodos);

      if (todos.length === 0) {
        setTodo({}); /// todosに値が入っていない場合、todoを空オブジェクトに。
      } else {
        const findTodo = todos.find((todo) => todo.id === id);
        setTodo(findTodo ?? {}); // todosに値が入っている場合、idが一致するtodoを探してset。
      }
    } else {
      setTodo({}); //idが一致するものがない場合、todoを空オブジェクトに。
    }
  }, [id, router.isReady]); //isReadyがtrueになった時にuseEffectが実行されるようにする。

  if (todo === null) return <div>通信中...</div>;
  if (Object.keys(todo).length === 0) return <p>タスクが存在しません</p>;

  if (todo === null) return <div>通信中...</div>;

  if (todo === null) return <div>通信中...</div>;

  return (
    <div>
      {todo && "id" in todo ? ( //todoオブジェクトに値が入っていることを保証する。
        <>
          <h1>TODO詳細</h1>
          <p>
            <strong>タスク:</strong> {todo.text}
          </p>
          <p>
            <strong>締め切り日:</strong> {todo.dueDate || "なし"}
          </p>
          <p>
            <strong>状態:</strong> {todo.isCompleted ? "完了済み" : "未完了"}
          </p>
        </>
      ) : (
        <p>タスクが見つかりません</p>
      )}
    </div>
  );
};
export default TodoDetails;
