import React, { FC } from 'react';
import './App.scss';

import Todo from './components/todo/todo';

const App: FC = () => {
	return (
		<div className="App">
			<Todo />
		</div>
	);
};

export default App;
