import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { TodoInterface } from "@/types/TodoInterface";

interface TodoStore {
  todos: TodoInterface[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  startEdit: (id: string) => void;
  finishEdit: (id: string, newText: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => {
  const storedTodos = typeof window !== 'undefined' ? localStorage.getItem('todos') : null;

  return {
    todos: storedTodos ? JSON.parse(storedTodos) : [],
    
    addTodo: (text) => {
      const newTodo = { id: uuidv4(), text, completed: false, editing: false };
      set((state) => {
        const updatedTodos = [...state.todos, newTodo];
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return { todos: updatedTodos };
      });
    },

    toggleTodo: (id) => {
      set((state) => {
        const updatedTodos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return { todos: updatedTodos };
      });
    },

    removeTodo: (id) => {
      set((state) => {
        const updatedTodos = state.todos.filter((todo) => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return { todos: updatedTodos };
      });
    },

    startEdit: (id) => {
      set((state) => {
        const updatedTodos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, editing: true } : todo
        );
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return { todos: updatedTodos };
      });
    },

    finishEdit: (id, newText) => {
      set((state) => {
        const updatedTodos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, text: newText, editing: false } : todo
        );
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return { todos: updatedTodos };
      });
    },
  };
});