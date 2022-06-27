import React, { useState } from 'react';

import './addForm.scss';
import { useStore } from '../../useStore';
import { ITodo } from '../../store/todoStore';

interface IForm {
	closeForm: () => void;
}

const AddForm = ({ closeForm }: IForm) => {
	const [inputValue, setInputValue] = useState('');
	const { todoStore } = useStore();
	const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newTodo: ITodo = {
			id: todoStore.nextId,
			checked: false,
			text: inputValue,
		};
		todoStore.addTodo(newTodo);
		setInputValue('');
		closeForm();
	};
	return (
		<form className="add-form" onSubmit={addTodo}>
			<label>Add new todo</label>
			<input
				placeholder="todo..."
				required
				value={inputValue}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setInputValue(e.target.value)
				}
			/>
			<button className="button" type="submit">
				Submit
			</button>
		</form>
	);
};

export default AddForm;
