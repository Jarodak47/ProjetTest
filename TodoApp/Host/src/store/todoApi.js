import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/**
 * API Redux pour la gestion des tâches
 * Gère les opérations CRUD avec le backend
 */
export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }), // URL de l'API
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    // Récupère toutes les tâches
    getTodos: builder.query({
      query: (statusFilter) =>
        statusFilter === 'all' ? 'todos' : `todos?status=${statusFilter}`,
      providesTags: (result) => 
        result 
          ? [...result.map(({ id }) => ({ type: 'Todo', id })), { type: 'Todo', id: 'LIST' }]
          : [{ type: 'Todo', id: 'LIST' }]
    }),

    // Ajoute une nouvelle tâche
    addTodo: builder.mutation({
      query: (todo) => ({
        url: 'todos',
        method: 'POST',
        body: {
          ...todo,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }]
    }),

    // Met à jour une tâche existante
    updateTodo: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body: {
          ...updates,
          updatedAt: new Date().toISOString()
        }
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Todo', id },
        { type: 'Todo', id: 'LIST' }
      ]
    }),

    // Supprime une tâche
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Todo', id },
        { type: 'Todo', id: 'LIST' }
      ]
    }),

    // Bascule le statut d'une tâche (completed/pending)
    toggleTodo: builder.mutation({
      query: ({ id, status }) => ({
        url: `todos/${id}`,
        method: 'PATCH',
        body: { 
          status,
          updatedAt: new Date().toISOString()
        }
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Todo', id },
        { type: 'Todo', id: 'LIST' }
      ]
    })
    
  })
})

// Export des hooks générés
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useToggleTodoMutation
} = todoApi
