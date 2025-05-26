import { action } from '@storybook/addon-actions';
import TodoItem from './TodoItem';

export default {
  title: 'components/TodoItem',
  component: TodoItem,
};


const dummyTodo = {
  id: 1,
  title: 'Exemple de tâche',
  description: 'Ceci est la description de la tâche',
  status: 'pending',
  priority: 'medium',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  dueDate: new Date().toISOString(),
};

export const Default = () => (
  <TodoItem 
    todo={dummyTodo} 
    onToggle={action('Clic Toggle')}
    onDelete={action('Clic Delete')}
    onEdit={action('Clic Edit')}
  />
);
export const Empty = () => (
  <TodoItem 
    todo={{}}
    onToggle={action('Clic Toggle')}
    onDelete={action('Clic Delete')}
    onEdit={action('Clic Edit')}
  />
);