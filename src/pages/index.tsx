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
      <div>
        <input type="text" value={text} onChange={changeText} />
        <button onClick={addTodos}>追加</button>
      </div>
      <div>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
            }}
          >
            <p>{todo.text}</p>
            <button onClick={() => deleteTodos(todo.id)}>完了</button>
          </li>
        ))}
      </div>
    </>
  );
}
