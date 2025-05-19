/**
 * @fileoverview Slice Redux pour la gestion des tâches (todos)
 * Ce fichier définit la logique de gestion d'état pour les tâches, incluant
 * les actions et reducers nécessaires pour manipuler la liste des tâches.
 */

import { createSlice } from '@reduxjs/toolkit';

/**
 * État initial du slice
 * @typedef {Object} TodoState
 * @property {Array} list - Liste des tâches
 * @property {string} currentView - Vue actuelle ('list', 'add','edit')
 * @property {Object|null} todoToEdit - Tâche en cours d'édition
 * @property {string} statusFilter - Filtre de statut ('all', 'pending', 'completed')
 */
const initialState = {
  list: [],
  currentView: 'list',
  todoToEdit: null,
  statusFilter: 'all'
};

/**
 * Création du slice Redux pour les tâches
 */
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    /**
     * Ajoute une nouvelle tâche à la liste
     * @param {TodoState} state - État actuel
     * @param {Object} action - Action Redux contenant la nouvelle tâche
     */
    addTodo: (state, action) => {
      const newTodo = {
        ...action.payload,
        id: state.list.length > 0 ? Math.max(...state.list.map(todo => todo.id)) + 1 : 1,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      state.list.push(newTodo);
      state.currentView = 'list';
    },

    /**
     * Modifie une tâche existante
     * @param {TodoState} state - État actuel
     * @param {Object} action - Action Redux contenant les modifications
     */
    editTodo: (state, action) => {
      const updated = action.payload;
      const index = state.list.findIndex(t => t.id === updated.id);
      if (index !== -1) {
        state.list[index] = {
          ...state.list[index],
          ...updated,
          updatedAt: new Date().toISOString()
        };
        state.currentView = 'list';
        state.todoToEdit = null;
      }
    },

    /**
     * Bascule l'état de complétion d'une tâche
     * @param {TodoState} state - État actuel
     * @param {Object} action - Action Redux contenant l'ID de la tâche
     */
    toggleComplete: (state, action) => {
      const todo = state.list.find(t => t.id === action.payload);
      if (todo) {
        todo.status = todo.status === 'completed' ? 'pending' : 'completed';
        todo.updatedAt = new Date().toISOString();
      }
    },

    /**
     * Change la vue actuelle
     * @param {TodoState} state - État actuel
     * @param {Object} action - Action Redux contenant la nouvelle vue
     */
    setView: (state, action) => {
      state.currentView = action.payload;
      if (action.payload === 'list') {
        state.todoToEdit = null;
      }
    },

    /**
     * Définit la tâche à éditer
     * @param {TodoState} state - État actuel
     * @param {Object} action - Action Redux contenant la tâche à éditer
     */
    setTodoToEdit: (state, action) => {
      state.todoToEdit = action.payload;
      state.currentView = 'edit';
    },

    /**
     * Supprime une tâche de la liste
     * @param {TodoState} state - État actuel
     * @param {Object} action - Action Redux contenant l'ID de la tâche à supprimer
     */
    deleteTodo: (state, action) => {
      state.list = state.list.filter(todo => todo.id !== action.payload);
    },

    /**
     * Met à jour le filtre de statut dans le state et  applique le filtre
     * @param {TodoState} state - État actuel
     * @param {Object} action - Action Redux contenant le nouveau filtre de statut
     */
    onStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    }
  }
});

// Export des actions et du reducer
export const { addTodo, editTodo, toggleComplete, setView, setTodoToEdit, deleteTodo, onStatusFilter } = todoSlice.actions;

// Sélecteur pour obtenir la liste filtrée des tâches
export const selectFilteredTodos = (state) => {
  const { list, statusFilter } = state.todos;
  switch (statusFilter) {
    case 'completed':
      return list.filter(todo => todo.status === 'completed');
    case 'pending':
      return list.filter(todo => todo.status === 'pending');
    default:
      return list;
  }
};

export default todoSlice.reducer;
