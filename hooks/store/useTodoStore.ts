import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { TodoInterface } from "@/types/TodoInterface";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

interface TodoStore {
  getTodos: () => void;
  todos: TodoInterface[];
  addTodo: (todo: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  startEdit: (id: string) => void;
  finishEdit: (id: string, newText: string) => void;
}

export const useTodoStore = create<TodoStore>((set, get) => {
  return {
    todos: [],

    getTodos: async () => {
      try {
        const { data, error } = await supabase.from("Todo").select();
        if (data) {
          await set({ todos: data || [] });
        } else if (error) {
          console.log(error);
        }
      } catch (e) {
        console.error(`Error getting data ${e}`);
      }
    },

    addTodo: async (todo) => {
      const newTodo = { id: uuidv4(), todo, completed: false, editing: false };
      try {
        const { error } = await supabase.from("Todo").insert(newTodo);

        if (error) {
          console.log(error);
          return;
        }

        set((state) => {
          const updatedTodos = [...state.todos, newTodo];
          return { todos: updatedTodos };
        });
      } catch (e) {
        console.error(`Error adding to database ${e}`);
        return;
      }
    },

    toggleTodo: async (id) => {
      try {
        const todos = get().todos;
        const todo = todos.find((t) => t.id === id)!;
        const { error } = await supabase
          .from("Todo")
          .update({ completed: !todo.completed })
          .eq("id", id);

        if (error) {
          console.log(error);
          return;
        }

        set((state) => {
          const updatedTodos = state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          );
          return { todos: updatedTodos };
        });
      } catch (e) {
        console.error(`Error updating to database ${e}`);
      }
    },

    removeTodo: async (id) => {
      try {
        const todos = get().todos;
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        const { error } = await supabase
          .from("Todo")
          .delete()
          .match({ id: id });

        if (error) {
          console.log(error);
          return;
        }

        set({ todos: updatedTodos });
      } catch (e) {
        console.error(`Error removing from database ${e}`);
      }
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
