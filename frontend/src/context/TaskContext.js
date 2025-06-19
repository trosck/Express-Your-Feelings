import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  selectedTask: null,
  isDialogOpen: false,
  dialogMode: 'create' // 'create' or 'edit'
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'SET_SELECTED_TASK':
      return { ...state, selectedTask: action.payload };
    case 'SET_DIALOG_OPEN':
      return { ...state, isDialogOpen: action.payload };
    case 'SET_DIALOG_MODE':
      return { ...state, dialogMode: action.payload };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Fetch all tasks
  const fetchTasks = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      dispatch({ type: 'SET_TASKS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Create new task
  const createTask = async (taskData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
      dispatch({ type: 'ADD_TASK', payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Update task
  const updateTask = async (id, taskData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, taskData);
      dispatch({ type: 'UPDATE_TASK', payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      dispatch({ type: 'DELETE_TASK', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Open dialog for creating new task
  const openCreateDialog = () => {
    dispatch({ type: 'SET_DIALOG_MODE', payload: 'create' });
    dispatch({ type: 'SET_SELECTED_TASK', payload: null });
    dispatch({ type: 'SET_DIALOG_OPEN', payload: true });
  };

  // Open dialog for editing task
  const openEditDialog = (task) => {
    dispatch({ type: 'SET_DIALOG_MODE', payload: 'edit' });
    dispatch({ type: 'SET_SELECTED_TASK', payload: task });
    dispatch({ type: 'SET_DIALOG_OPEN', payload: true });
  };

  // Close dialog
  const closeDialog = () => {
    dispatch({ type: 'SET_DIALOG_OPEN', payload: false });
    dispatch({ type: 'SET_SELECTED_TASK', payload: null });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const value = {
    ...state,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    clearError
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}; 