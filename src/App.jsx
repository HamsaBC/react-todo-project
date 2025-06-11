import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"

export default function App() {
  const [filter,setFilter] = useState("all");
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if(localValue == null) return []

    return JSON.parse(localValue)
  })
  
  useEffect(() => {
    localStorage.setItem("ITEMS",JSON.stringify(todos))
  },[todos])

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  

  const filteredTodos = todos.filter((todo) => {
    if(filter === "completed") return todo.completed;
    if(filter === "pending") return !todo.completed;
    return true;

  })

  return (
    <>
      <NewTodoForm onSubmit={addTodo}/>

      <h1 className="header">Todo List</h1>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <TodoList todos = {filteredTodos} toggleTodo={toggleTodo} deleteTodo=
      {deleteTodo}/>
    </>
  )
}
