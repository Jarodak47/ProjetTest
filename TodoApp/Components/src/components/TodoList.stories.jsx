import TodoList from './TodoList';
import todoList from '../data/defaultData';
import { action } from '@storybook/addon-actions';

const meta = {
  component: TodoList,
};

export default meta;

export const Default = {
  meta,
};

export const Filed = {
  meta,
  args: {
    todos: todoList,
    currentPage: 1,
    totalPages: 2,
    onPageChange: () => {},
    onStatusFilter: () => {},
    onToggle: () => {},
    onDelete: () => {},
    onEdit: () => {},
  },
};

export const FiledWithActions = {
  meta,
  args: {
    todos: todoList,
    currentPage: 1,
    totalPages: 3,
    onPageChange: (id) => {action('Clic Page')(id)},
    onStatusFilter: (id) => {action('Clic Filter')(id)},
    onToggle: (id) => {action('Clic Toggle')(id)},
    onDelete: (id) => {action('Clic Delete')(id)},
    onEdit: (id) => {action('Clic Edit')(id)},
  },
}
  