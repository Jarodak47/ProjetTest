/**
 * Utilitaires pour la gestion des libellés des tâches
 * Ce module fournit des fonctions pour convertir les valeurs techniques en libellés utilisateur
 */

/**
 * Convertit un statut technique en libellé utilisateur en français
 * 
 * @param {string} status - Le statut technique de la tâche ('pending', 'in-progress', 'completed')
 * @returns {string} Le libellé correspondant en français
 */
const getStatusLabel = (status) => {
    switch(status) {
      case "pending": return "En attente";
      case "in-progress": return "En cours"; 
      case "completed": return "Terminé";
      default: return "";
    }
  };

/**
 * Convertit un niveau de priorité technique en libellé utilisateur en français
 * 
 * @param {string} priority - Le niveau de priorité technique ('low', 'medium', 'high')
 * @returns {string} Le libellé correspondant en français
 */
const getPriorityLabel = (priority) => {
    switch(priority) {
      case "low": return "Basse";
      case "medium": return "Moyenne";
      case "high": return "Haute";
      default: return "Non spécifiée";
    }
  };

export { getStatusLabel, getPriorityLabel };
