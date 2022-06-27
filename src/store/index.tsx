import { createContext } from 'react';
import TodoStore from './todoStore';

export const rootStoreContext = createContext({
	todoStore: new TodoStore(),
});
