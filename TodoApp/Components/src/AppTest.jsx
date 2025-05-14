import './styles/theme.css'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import { useState } from 'react'
import todoList from './data/defaultData'

function AppTest() {
  const [currentView, setCurrentView] = useState('list')
  const [todos, setTodos] = useState(todoList)
  const [todoToEdit, setTodoToEdit] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')

  const addTodo = (e) => {
    e.preventDefault();
  
    const form = e.target;
    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      title: form.title.value.trim(),
      description: form.description.value.trim(),
      priority: form.priority.value,
      dueDate: form.dueDate.value || null,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  
    setTodos([...todos, newTodo]);
    setCurrentView('list');
  };
  

  const deleteTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId))
  }

  const toggleTodoComplete = (currentTodo) => {
    setTodos(todos.map(todo =>
      todo.id === currentTodo.id
        ? {
            ...todo,
            status: todo.status ="completed",
            updatedAt: new Date().toISOString()
          }
        : todo
    )
)
  }
  

  const editTodo = (e) => {
    e.preventDefault();
    const form = e.target;
    
    const updatedTodo = {
      id: todoToEdit.id,
      title: form.title.value.trim(),
      description: form.description.value.trim(),
      priority: form.priority.value,
      dueDate: form.dueDate.value || null,
      status: form.status.value,
      createdAt: todoToEdit.createdAt,
      updatedAt: new Date().toISOString()
    };

    setTodos(todos.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
  
    setTodoToEdit(null);
    setCurrentView('list');
  };

  const handleEditClick = (todoId) => {
    console.log({todoId})
    const todo = todos.find(t => t.id === todoId.id);
    console.log({todo})
    setTodoToEdit(todo);
    setCurrentView('edit');
  };
  

  const onStatusFilter = (status) => {
    setStatusFilter(status)
  }

  const filteredTodos = statusFilter === 'all' 
    ? todos
    : todos.filter(todo => todo.status === statusFilter)

  return (
    <div className="app-container">
      <h1>Application de Gestion de Tâches</h1>
      
      <nav className="todo-nav">
        <button 
          className={currentView === 'list' ? 'active' : ''} 
          onClick={() => setCurrentView('list')}
        >
          Voir la liste des tâches
        </button>
        <button 
          className={currentView === 'add' ? 'active' : ''} 
          onClick={() => setCurrentView('add')}
        >
          Ajouter une tâche
        </button>
      </nav>

      {currentView === 'list' && 
        <TodoList 
          todos={filteredTodos}
          onDelete={deleteTodo}
          onToggle={toggleTodoComplete}
          onEdit={handleEditClick}
          onStatusFilter={onStatusFilter}
        />
      }
      {currentView === 'add' && <TodoForm onSubmit={addTodo} />}
      {currentView === 'edit' && <TodoForm todo={todoToEdit} onSubmit={editTodo} />}
    </div>
  )
}

export default AppTest