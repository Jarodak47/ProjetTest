import TodoItem from './TodoItem';
import '../styles/theme.css'

/**
 * Composant TodoList - Gère l'affichage d'une liste de tâches paginée avec filtres
 * 
 * Ce composant est responsable de :
 * - Afficher la liste des tâches via des composants TodoItem
 * - Gérer la pagination de la liste
 * - Filtrer les tâches par statut
 * - Transmettre les actions (toggle, delete, edit) aux items
 * 
 * @component
 * @param {Object} props - Les propriétés du composant
 * @param {Array} props.todos - Tableau des tâches à afficher
 * @param {number} props.currentPage - Numéro de la page courante
 * @param {number} props.totalPages - Nombre total de pages
 * @param {Function} props.onToggle - Fonction pour basculer l'état d'une tâche
 * @param {Function} props.onDelete - Fonction pour supprimer une tâche
 * @param {Function} props.onEdit - Fonction pour modifier une tâche
 * @param {Function} props.onPageChange - Fonction pour changer de page
 * @param {Function} props.onStatusFilter - Fonction pour filtrer les tâches par statut
 */

const TodoList = ({ todos, currentPage, totalPages, onToggle, onDelete, onEdit, onPageChange,onStatusFilter }) => {
    let filteredTodos = todos

    /**
     * Génère les contrôles de pagination
     * Inclut les boutons Précédent/Suivant et l'indicateur de page actuelle
     * Les boutons sont désactivés aux limites (première/dernière page)
     * 
     * @returns {JSX.Element} Les contrôles de pagination
     */
    const pagination = () => (
        <div className="pagination">
            <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
            >
                Précédent
            </button>
            <span className="pagination-info">{currentPage} / {totalPages}</span>
            <button 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button"
            >
                Suivant
            </button>
        </div>
    );
    
    return (
        <div className="todo-list-container">
            {/* Filtres par statut */}
            <div className="status-filters">
                <button 
                    className={`filter-button ${'all' }`}
                    onClick={() => filteredTodos = onStatusFilter('all')
                    }
                >
                    Toutes
                </button>
                <button 
                    className={`filter-button ${'completed' }`}
                    onClick={() => filteredTodos = onStatusFilter('completed')}
                >
                    Terminées
                </button>
                <button 
                    className={`filter-button ${'pending' }`}
                    onClick={() => filteredTodos = onStatusFilter('pending')}
                >
                    En cours
                </button>
                
            </div>

            {/* Liste des tâches filtrées */}
            <ul className="todo-list">
                {filteredTodos?.map((todo) => (
                    <TodoItem 
                        key={todo.id} 
                        todo={todo} 
                        onToggle={onToggle} 
                        onDelete={onDelete} 
                        onEdit={onEdit}
                        className="todo-item" 
                    />
                ))}
            </ul>

            {/* Affichage conditionnel des contrôles de pagination */}
            {totalPages > 1 && pagination()}
        </div>
    );
};

export default TodoList;