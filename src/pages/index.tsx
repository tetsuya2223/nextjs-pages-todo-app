import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type todo = {
  id: string;
  text: string;
};

export default function Home() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<todo[]>([]);

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    console.log(text);
  };

  const addTodos = () => {
    const newTodos: todo = {
      id: uuidv4(),
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
        {todos.map((todo, index) => (
          <li
            key={index}
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
