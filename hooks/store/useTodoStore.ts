import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { TodoInterface } from "@/types/TodoInterface";

interface TodoStore {
  getTodos: () => void;
  todos: TodoInterface[];
  addTodo: (todo: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  startEdit: (id: string) => void;
  finishEdit: (id: string, newText: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => {
  const storedTodos =
    typeof window !== "undefined" ? localStorage.getItem("todos") : null;

  return {
    getTodos: async () => {
      try {
        const res = await fetch("https://dummyjson.com/todos");
        const data = await res.json();
        console.log(data, 24)
        await set((state) => {
          return { todos: data.todos };
        });
      } catch (e) {
        console.error(`Error getting data ${e}`);
      }
    },

    todos: storedTodos ? JSON.parse(storedTodos) : [],

    addTodo: (todo) => {
      const newTodo = { id: uuidv4(), todo, completed: false, editing: false };
      set((state) => {
        const updatedTodos = [...state.todos, newTodo];
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return { todos: updatedTodos };
      });
    },

    toggleTodo: (id) => {
      set((state) => {
        const updatedTodos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return { todos: updatedTodos };
      });
    },

    removeTodo: (id) => {
      set((state) => {
        const updatedTodos = state.todos.filter((todo) => todo.id !== id);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return { todos: updatedTodos };
      });
    },

    startEdit: (id) => {
      set((state) => {
        const updatedTodos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, editing: true } : todo
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return { todos: updatedTodos };
      });
    },

    finishEdit: (id, newText) => {
      set((state) => {
        const updatedTodos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, todo: newText, editing: false } : todo
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return { todos: updatedTodos };
      });
    },
  };
});
