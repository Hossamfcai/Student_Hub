import { user } from "../data/data";
import { v4 as uuidv4 } from "uuid";

export const STORAGE_KEY = "student-hub-user";

// Helper function to read from localStorage synchronously on mount
export function getInitialUserState() {
  try {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (!savedUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return user;
    }
    return JSON.parse(savedUser);
  } catch {
    return user;
  }
}
export function updateLocalStorage(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}
export default function reducer(currentState, action) {
  switch (action.type) {
    case "getUser": {
      return getInitialUserState();
    }

    case "addTask": {
      const newTask = {
        id: uuidv4(),
        ...action.payload,
      };
      const newUser = {
        ...currentState,
        initialTasks: [...currentState.initialTasks, newTask],
      };
      updateLocalStorage(newUser);
      return newUser;
    }
    case "updateTask": {
      const newTasks = currentState.initialTasks.map((task) =>
        task.id === action.payload.task.id
          ? {
              ...task,
              ...action.payload.formData,
            }
          : task,
      );
      const newUser = { ...currentState, initialTasks: [...newTasks] };
      updateLocalStorage(newUser);
      return newUser;
    }
    case "deleteTask": {
      const newTasks = currentState.initialTasks.filter((task) => {
        return task.id !== action.payload.id;
      });
      const newUser = { ...currentState, initialTasks: [...newTasks] };
      updateLocalStorage(newUser);
      return newUser;
    }
    case "onToggleComplete": {
      const newTasks = currentState.initialTasks.map((task) => {
        if (task.id !== action.payload.id) {
          return task;
        }

        const completed = task.status === "Completed";

        return {
          ...task,
          status: completed ? "Pending" : "Completed",
        };
      });
      const newUser = { ...currentState, initialTasks: [...newTasks] };
      updateLocalStorage(newUser);
      return newUser;
    }
    default:
      return currentState;
  }
}
