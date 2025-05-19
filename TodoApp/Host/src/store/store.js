// Ce fichier configure le store Redux pour l'application
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import { todoApi } from './todoApi';

// Création et export du store Redux
export const store = configureStore({
  reducer: {
    // Le reducer 'todos' gère l'état des tâches
    // todoReducer contient la logique de modification de l'état
    todos: todoReducer,
    // Ajout du reducer de l'API
    [todoApi.reducerPath]: todoApi.reducer
  },
  // Ajout du middleware de l'API
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware)
});
