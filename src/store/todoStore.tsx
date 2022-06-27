import { action, computed, makeObservable, observable } from 'mobx';

export interface ITodo {
	id: number;
	text: string;
	checked: boolean;
}

class TodoStore {
	todos: ITodo[] = [
		{ id: 1, text: 'todo 1', checked: true },
		{ id: 2, text: 'todo 2', checked: false },
		{ id: 3, text: 'todo 3', checked: false },
	];
	nextId: number = 4;

	toggleCheck(id: number) {
		const index = this.todos.findIndex(todo => todo.id === id);
		this.todos[index].checked = !this.todos[index].checked;
	}
	addTodo(todo: ITodo) {
		this.todos.push(todo);
		this.nextId++;
	}
	removeTodo(id: number) {
		this.todos = this.todos.filter(obj => obj.id !== id);
	}
	get completedTodos() {
		return this.todos.filter(todo => todo.checked);
	}

	get incompleteTodos() {
		return this.todos.filter(todo => !todo.checked);
	}
	constructor() {
		makeObservable(this, {
			nextId: observable,
			todos: observable,
			toggleCheck: action,
			addTodo: action,
			removeTodo: action,
			completedTodos: computed,
			incompleteTodos: computed,
		});
	}
}
export default TodoStore;
