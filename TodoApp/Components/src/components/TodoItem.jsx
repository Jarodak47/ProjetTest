import '../styles/theme.css';
import {getStatusLabel, getPriorityLabel} from '../utils/todoUtils';

/**
 * Composant TodoItem - Représente un élément individuel de la liste de tâches
 * 
 * Ce composant affiche une tâche individuelle avec toutes ses informations et contrôles.
 * Il gère l'affichage et les interactions utilisateur pour une seule tâche.
 * 
 * @component
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.todo - L'objet contenant les données de la tâche
 * @param {string} props.todo.id - Identifiant unique de la tâche
 * @param {string} props.todo.title - Titre de la tâche
 * @param {string} props.todo.description - Description détaillée de la tâche
 * @param {string} props.todo.status - Statut actuel de la tâche ('pending', 'completed', etc.)
 * @param {string} props.todo.priority - Niveau de priorité de la tâche
 * @param {Date} [props.todo.createdAt] - Date de création de la tâche
 * @param {Date} [props.todo.updatedAt] - Date de dernière modification de la tâche
 * @param {Date} [props.todo.dueDate] - Date d'échéance de la tâche
 * @param {Function} props.onToggle - Fonction pour basculer l'état de la tâche
 * @param {Function} props.onDelete - Fonction pour supprimer la tâche
 * @param {Function} props.onEdit - Fonction pour éditer la tâche
 * 
 * @returns {JSX.Element} Un élément de liste contenant les détails et contrôles de la tâche
 */
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  
  return (
    <li className={`todo-item`}>
      {/* En-tête de la tâche contenant le titre et les actions principales */}
      <div className="todo-item-header">
        
        <h3>{todo.title}</h3>
        <div className="todo-item-actions">
          {/* Case à cocher pour marquer la tâche comme terminée */}
          <input 
          type="checkbox"
          checked={todo.status === "completed"}
          onChange={() => todo.status !== "completed" && onToggle(todo)}
          className="todo-checkbox"
          disabled={todo.status === "completed"}
          aria-label={`Marquer ${todo.title} comme terminée`}
          />

          {/* Boutons d'action pour modifier et supprimer la tâche */}
          <button onClick={() => onEdit(todo)} className="edit-btn" disabled = {todo.status ==="completed"}>Modifier</button>
          <button onClick={() => onDelete(todo.id)} className="delete-btn">Supprimer</button>
        </div>
      </div>

      {/* Section des détails de la tâche */}
      <div className="todo-item-details">
        <p className="description">{todo.description}</p>
        
        {/* Métadonnées de la tâche */}
        <div className="todo-item-metadata">
          {/* Affichage du statut avec classe CSS dynamique */}
          <span className={`status ${todo.status}`}>
            {getStatusLabel(todo.status)}
          </span>
          
          {/* Affichage de la priorité avec classe CSS dynamique */}
          <span className={`priority ${todo.priority}`}>
            {getPriorityLabel(todo.priority)}
          </span>

          {/* Affichage conditionnel des dates */}
          {todo.createdAt && (
            <span className="created-at">
              Date de création: {new Date(todo.createdAt).toLocaleDateString()}
            </span>
          )}
          {todo.updatedAt && (
            <span className="update-at">
              Date de mise à jour: {new Date(todo.updatedAt).toLocaleDateString()}
            </span>
          )}
          {todo.dueDate && (
            <span className="due-date">
              Date d'échéance: {new Date(todo.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

export default TodoItem;
