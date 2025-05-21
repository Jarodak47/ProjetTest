/**
 * @file App.jsx
 * @description Composant principal de l'application hôte.
 * Ce composant gère la navigation entre la liste des tâches et le formulaire d'ajout.
 */

import { Suspense, lazy } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation, useToggleTodoMutation } from './store/todoApi'
import { setView, setTodoToEdit, onStatusFilter } from './store/todoSlice'

// Lazy-load des composants distants (exposés par le micro-frontend Components)
const TodoForm = lazy(() => import('components/TodoForm'))
const TodoList = lazy(() => import('components/TodoList'))

/**
 * Composant App
 * @returns {JSX.Element} Le rendu du composant
 */
function App() {
  const dispatch = useDispatch()
  const currentView = useSelector((state) => state.todos.currentView)
  const statusFilter = useSelector((state) => state.todos.statusFilter)
  const todoToEdit = useSelector((state) => state.todos.todoToEdit)

  // Récupération des todos via RTK Query (si tu souhaites utiliser l'API)
  const { data: apiTodos, isLoading } = useGetTodosQuery(statusFilter)
  const [addTodo] = useAddTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()
  const [toggleTodo] = useToggleTodoMutation()

  const todos = apiTodos || []
  
  const handleAdd = async (e) => {
    e.preventDefault();

    // Récupérer les valeurs du formulaire
    // const formData = new FormData(e.target);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

  

    console.log('Données reçues du formulaire:', data);

    try {
      const result = await addTodo({ ...data }).unwrap();
      console.log("Tâche ajoutée avec succès:", result);
      dispatch(setView('list'));
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
    }
  }

  const handleStartEdit = (todo) => {
    dispatch(setTodoToEdit(todo));
  }
  
  const handleEdit = async (e) => {
    e.preventDefault();
    // Récupérer les valeurs du formulaire
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
      if (todoToEdit) {
        const { id } = todoToEdit;
        const result = await updateTodo({ id, ...data }).unwrap();
        console.log("✅ Tâche modifiée avec succès :", result);
        dispatch(setTodoToEdit(null));
        // dispatch(setView('list'));
      }
    } catch (error) {
      console.error("❌ Erreur lors de la modification :", error);
    }
  }


  const handleToggle = async (id) => {
    try {
      console.log({ id })
      // (1) On cherche la tâche dans le tableau (pour obtenir son statut actuel)
      const todo = todos.find(t => t.id === id.id)
      if (todo) {
        // (3) Appel de la mutation (RTK Query) pour basculer le statut (PATCH /api/{id}/toggle)
        const result = await toggleTodo({ id: todo.id, status: 'completed' }).unwrap();

        console.log("Statut basculé avec succès:", result.status)
      } else {
        console.warn("Tâche non trouvée (id:", id, ")")
      }
    } catch (error) {
      console.error("Erreur lors du changement de statut:", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id).unwrap()
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    }
  }

  const handleFilterChange = (filter) => {
    dispatch(onStatusFilter(filter))
  }

  if (isLoading) {
    return <div>Chargement des tâches...</div>
  }

  return (
    <Suspense fallback={<div>Chargement des composants...</div>}>
      <div className="app-container">
        <h1>Application de Gestion de Tâches</h1>
        <nav className="todo-nav">
          <button
            className={currentView === 'list' ? 'active' : ''}
            onClick={() => dispatch(setView('list'))}
          >
            Voir la liste des tâches
          </button>
          <button
            className={currentView === 'add' ? 'active' : ''}
            onClick={() => dispatch(setView('add'))}
          >
            Ajouter une tâche
          </button>
        </nav>

        {/* Affichage conditionnel des composants en fonction de la vue */}
        {currentView === 'list' && (
          <TodoList
            todos={todos}
            onEdit={handleStartEdit}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onStatusFilter={handleFilterChange}
          />
        )}
        {currentView === 'add' && <TodoForm onSubmit={handleAdd} />}
        {currentView === 'edit' && <TodoForm todo={todoToEdit} onSubmit={handleEdit} />}
      </div>
    </Suspense>
  )
}

export default App
