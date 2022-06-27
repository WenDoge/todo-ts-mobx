import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useStore } from '../../useStore';
import { ITodo } from '../../store/todoStore';
import './todoItem.scss';

interface ITodoItemProps {
	todo?: ITodo;
}

const TodoItem: FC<ITodoItemProps> = observer(({ todo }: ITodoItemProps) => {
	const { todoStore } = useStore();

	return todo ? (
		<div className="todo-item">
			<input
				type="checkbox"
				checked={todo.checked}
				onChange={() => todoStore.toggleCheck(todo.id)}
			/>
			<span>{todo.text}</span>
			<button
				className="button todo-item__delete"
				onClick={() => todoStore.removeTodo(todo.id)}>
				X
			</button>
		</div>
	) : (
		<div className="todo-item">
			<span>No TODOs :(</span>
		</div>
	);
});

export default TodoItem;
