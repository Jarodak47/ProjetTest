import TodoForm from './TodoForm';
import todoList from '../data/defaultData';

const meta = {
  component: TodoForm,
  title: 'components/TodoForm',
};

export default meta;

export const Empty = {
  args: {
    todo: undefined,
  },
};

export const Edit = {
  args: {
    todo: todoList[0],
    onSubmit: (values) => console.log('Edit form submitted:', values),
  },
};

export const Create = {
  args: {
    todo: undefined,
    onSubmit: (values) => console.log('Create form submitted:', values),
  },
};