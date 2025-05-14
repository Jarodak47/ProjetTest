/**
 * @file App.jsx
 * @description Composant principal du microfrontend Components.
 * Ce composant gère la navigation entre la liste des tâches et le formulaire d'ajout.
 */

import './styles/theme.css'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import { useState } from 'react'

/**
 * Composant App
 * @returns {JSX.Element} Le rendu du composant
 */
function App() {
  // État pour gérer la vue courante (liste ou ajout)
  const [currentView, setCurrentView] = useState('list')

  return (
    <div className="app-container">
      <h1>Application de Gestion de Tâches</h1>
      
      {/* Navigation entre les différentes vues */}
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

      {/* 
        Affichage conditionnel des composants en fonction de la vue
        @todo: Implémenter la liste des tâches et la fonction onSubmit depuis le microfrontend principal
      */}
      {currentView === 'list' && <TodoList todos={[]} />}
      {currentView === 'add' && <TodoForm onSubmit={() => {}} />} 
    </div>
  )
}

export default App 