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
    case "addNote": {
      const newNote = {
        id: uuidv4(),
        updatedAt: action.payload.date,
        ...action.payload.formData,
      };
      const newUser = {
        ...currentState,
        initialNotes: [...currentState.initialNotes, newNote],
      };
      updateLocalStorage(newUser);
      return newUser;
    }

    case "updateNote": {
      const newNote = currentState.initialNotes.map((note) =>
        note.id === action.payload.id
          ? {
              ...note,
              ...action.payload.formData,
              updatedAt: action.payload.updatedAt,
            }
          : note,
      );
      const newUser = { ...currentState, initialNotes: [...newNote] };
      updateLocalStorage(newUser);
      return newUser;
    }
    case "deleteNote": {
      const newNote = currentState.initialNotes.filter((note) => {
        return note.id !== action.payload.id;
      });
      const newUser = { ...currentState, initialNotes: [...newNote] };
      updateLocalStorage(newUser);
      return newUser;
    }
    case "onTogglePin": {
      const newNotes = currentState.initialNotes.map((note) => {
        if (note.id === action.payload.id) {
          return {
            ...note,
            pinned: !note.pinned,
            updatedAt: new Date().toISOString(),
          };
        } else {
          return note;
        }
      });
      const newUser = { ...currentState, initialNotes: [...newNotes] };
      updateLocalStorage(newUser);
      return newUser;
    }
    case "onToggleFavorite": {
      const newNotes = currentState.initialNotes.map((note) => {
        if (note.id === action.payload.id) {
          return {
            ...note,
            favorite: !note.favorite,
          };
        } else {
          return note;
        }
      });
      const newUser = { ...currentState, initialNotes: [...newNotes] };
      updateLocalStorage(newUser);
      return newUser;
    }
    case "addResource": {
      const newResource = {
        id: uuidv4(),
        ...action.payload.formData,
      };
      const newUser = {
        ...currentState,
        resources: [...currentState.resources, newResource],
      };
      updateLocalStorage(newUser);
      return newUser;
    }
    case "updateResource": {
      const newResources = currentState.resources.map((resource) =>
        resource.id === action.payload.id
          ? {
              ...resource,
              ...action.payload.formData,
            }
          : resource,
      );
      const newUser = { ...currentState, resources: [...newResources] };
      updateLocalStorage(newUser);
      return newUser;
    }
    case "deleteResource": {
      const newResources = currentState.resources.filter((resource) => {
        return resource.id !== action.payload.id;
      });
      const newUser = { ...currentState, resources: [...newResources] };
      updateLocalStorage(newUser);
      return newUser;
    }
    case "onResourceTogglePin": {
      const newResources = currentState.resources.map((resource) => {
        if (resource.id === action.payload.id) {
          return {
            ...resource,
            pinned: !resource.pinned,
          };
        } else {
          return resource;
        }
      });
      const newUser = { ...currentState, resources: [...newResources] };
      updateLocalStorage(newUser);
      return newUser;
    }
    case "onResourceToggleFavorite": {
      const newResources = currentState.resources.map((resource) => {
        if (resource.id === action.payload.id) {
          return {
            ...resource,
            favourite: !resource.favourite,
          };
        } else {
          return resource;
        }
      });
      const newUser = { ...currentState, resources: [...newResources] };
      updateLocalStorage(newUser);
      return newUser;
    }
    case "updateUserSkills": {
      const newSkills = [...action.payload.skills];
      const newUser = { ...currentState, skills: [...newSkills] };
      updateLocalStorage(newUser);
      return newUser;
    }
    case "updateConnect": {
      const newConnect = [...action.payload.connect];
      const newUser = { ...currentState, connect: [...newConnect] };
      updateLocalStorage(newUser);
      return newUser;
    }
    case "updatePersonalInfo": {
      const newInfo = { ...action.payload };
      const newUser = { ...currentState, personalInfo: { ...newInfo } };
      updateLocalStorage(newUser);
      return newUser;
    }
    case "updateAcademicInfo": {
      const newInfo = { ...action.payload };
      const newUser = { ...currentState, AcademicInfo: { ...newInfo } };
      updateLocalStorage(newUser);
      return newUser;
    }
    case "updateImage": {
      const newUser = { ...currentState, image: { url: action.payload } };
      updateLocalStorage(newUser);
      return newUser;
    }
    default:
      return currentState;
  }
}
