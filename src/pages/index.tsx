import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    console.log(text);
  };

  const addTodos = () => {
    const newTodos = [...todos, text];
    setTodos(newTodos);
    setText("");
  };

  const deleteTodos = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
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
            key={todo}
            style={{
              display: "flex",
            }}
          >
            <p>{todo}</p>
            <button onClick={() => deleteTodos(index)}>完了</button>
          </li>
        ))}
      </div>
    </>
  );
}
