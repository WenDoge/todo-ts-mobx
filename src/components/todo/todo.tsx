import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import './todo.scss';
import { useStore } from '../../useStore';
import TodoItem from '../todoItem/todoItem';
import AddForm from '../addForm/addForm';

const Todo: FC = observer(() => {
	const { todoStore } = useStore();
	const [buttonToggle, setButtonToggle] = useState(false);
	const [todoList, setTodoList] = useState(todoStore.todos);
	const [checkboxFilters, setCheckboxFilters] = useState({
		completed: false,
		incompleted: false,
	});
	useEffect(() => {
		if (!checkboxFilters.completed && !checkboxFilters.incompleted)
			setTodoList(todoStore.todos);
		else {
			if (checkboxFilters.completed) setTodoList(todoStore.completedTodos);
			else setTodoList(todoStore.incompleteTodos);
		}
	}, [
		checkboxFilters,
		todoStore.todos,
		todoStore.completedTodos,
		todoStore.incompleteTodos,
	]);
	const inputHandleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'filter-completed') {
			if (e.target.checked) {
				setCheckboxFilters({ incompleted: false, completed: true });

				setTodoList(todoStore.completedTodos);
			} else {
				setCheckboxFilters({ incompleted: false, completed: false });
				setTodoList(todoStore.todos);
			}
		} else {
			if (e.target.checked) {
				setCheckboxFilters({ incompleted: true, completed: false });

				setTodoList(todoStore.incompleteTodos);
			} else {
				setCheckboxFilters({ incompleted: false, completed: false });
				setTodoList(todoStore.todos);
			}
		}
	};
	return (
		<div className="todo">
			<h2>TODOS</h2>
			<div className="checkbox-filters">
				<div>
					<input
						checked={checkboxFilters.completed}
						type="checkbox"
						name="filter-completed"
						onChange={inputHandleCheck}
					/>
					<label htmlFor="filter-completed">Show only completed</label>
				</div>
				<div>
					<input
						type="checkbox"
						name="filter-incompleted"
						checked={checkboxFilters.incompleted}
						onChange={inputHandleCheck}
					/>
					<label htmlFor="filter-incompleted">Show only incompleted</label>
				</div>
			</div>
			<div className="todo-items-container">
				{todoList.length ? (
					todoList.map(todo => <TodoItem key={todo.id} todo={todo} />)
				) : (
					<TodoItem />
				)}
				<button
					className="button"
					onClick={() => setButtonToggle(!buttonToggle)}>
					{!buttonToggle ? 'Add Todo' : 'Cancel'}
				</button>
				{buttonToggle ? (
					<AddForm closeForm={() => setButtonToggle(false)} />
				) : null}
			</div>
		</div>
	);
});
export default Todo;
