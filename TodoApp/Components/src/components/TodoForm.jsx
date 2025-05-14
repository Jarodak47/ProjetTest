import '../styles/theme.css';
/**
 * Composant TodoForm - Gère le formulaire de création/modification d'une tâche
 * 
 * Ce composant est responsable de :
 * - Afficher le formulaire avec tous les champs nécessaires pour une tâche
 * - Gérer la soumission du formulaire et la collecte des données
 * - Supporter à la fois la création et la modification d'une tâche existante
 * 
 * La logique métier (création/édition) est déléguée au composant parent dans le micro-frontend principal.
 * 
 * @component
 * @param {Object} props - Les propriétés du composant
 * @param {Object} [props.todo] - Tâche existante à modifier (optionnel)
 * @param {Function} props.onSubmit - Fonction appelée lors de la soumission du formulaire
 */
function TodoForm({ todo , onSubmit }) {
  console.log({todo})
  return (
    <form className="todo-form" onSubmit={onSubmit}>
      {/* Champ pour le titre de la tâche */}
      <div className="form-group">
        <label htmlFor="title">Titre:</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={todo?.title || ''}
          required
          placeholder="Entrez le titre de la tâche"
        />
      </div>

      {/* Zone de texte pour la description détaillée */}
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          defaultValue={todo?.description || ''}
          placeholder="Décrivez la tâche en détail"
          rows="3"
        />
      </div>

      {/* Sélecteur pour le statut de la tâche */}
      <div className="form-group">
        <label htmlFor="status">Statut:</label>
        <select
          id="status"
          name="status"
          defaultValue={todo?.status || 'pending'}
        >
          <option value="pending">En attente</option>
          <option value="in-progress">En cours</option>
          <option value="completed">Terminé</option>
        </select>
      </div>

      {/* Sélecteur pour le niveau de priorité */}
      <div className="form-group">
        <label htmlFor="priority">Priorité:</label>
        <select
          id="priority"
          name="priority"
          defaultValue={todo?.priority || 'medium'}
        >
          <option value="low">Basse</option>
          <option value="medium">Moyenne</option>
          <option value="high">Haute</option>
        </select>
      </div>

      {/* Sélecteur de date pour l'échéance */}
      <div className="form-group">
        <label htmlFor="dueDate">Date d'échéance:</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          defaultValue={todo?.dueDate || ''}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>
      {/* Bouton de soumission qui s'adapte au contexte (création/modification) */}
      <button type="submit" className="btn-primary">
        {(!todo || Object.keys(todo).length === 0 )? 'Ajouter' : 'Modifier'} la tâche
      </button>
    </form>
  );
}

export default TodoForm;
